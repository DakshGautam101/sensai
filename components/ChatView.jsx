"use client";
import { MessagesContext } from '@/context/MessagesContext';
import { userDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link2, ArrowRight, Loader2 } from 'lucide-react';
import StarBorder from '@/app/themes/StarBorder';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const ChatView = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { UserDetail, setUserDetail } = useContext(userDetailContext);
  const [Input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' && localStorage.getItem('user');
    if (storedUser && !UserDetail) {
      const userData = JSON.parse(storedUser);
      setUserDetail(userData);
    }

    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt && id && !isGenerating) {
      setIsGenerating(true);
      setLoading(true);
      onGenarate(initialPrompt);
    }
  }, [id, searchParams]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });

    if (result?.messages) {
      setMessages(result.messages);
      setChatMessages(Array.isArray(result.messages) ? result.messages : [result.messages]);
    }
  };

  const onGenarate = async (input) => {
    if (!input || !id) return;
    setLoading(true);
    const newMessages = [...chatMessages, { content: input, role: 'user' }];
    setChatMessages(newMessages);
    setInput('');

    try {
      console.log("Calling /api/codegenerate with input:", input);
      await axios.post('/api/codegenerate', { prompt: input });
    } catch (error) {
      console.error('Error generating code immediately after user input:', error);
    }

    const loadingMessage = { content: 'Thinking...', role: 'assistant', temp: true };
    setChatMessages((prev) => [...prev, loadingMessage]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: input,
          workspaceId: id
        }),
      });

      const data = await res.json();

      if (data.success) {
        const assistantMessage = { content: data.message, role: 'assistant' };
        const updatedMessages = [...newMessages, assistantMessage];

        setChatMessages(updatedMessages);
        setMessages(updatedMessages); // ✅ Important: update context

        await convex.mutation(api.workspace.updateMessages, {
          workspaceId: id,
          messages: updatedMessages
        });

      } else {
        setChatMessages(newMessages);
      }

    } catch (err) {
      console.error('ChatView: Error generating AI response:', err);
      setChatMessages(newMessages);
    } finally {
      setIsGenerating(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[85vh] flex flex-col bg-[#0f0f0f] text-white rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-hide">
        {chatMessages && chatMessages.map((msg, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-xl shadow-sm">
            <div className="flex gap-3 items-start">
              {msg.role === 'user' && UserDetail?.picture && (
                <div className="relative w-8 h-8 shrink-0">
                  <img src={UserDetail.picture} alt="user" className="w-8 h-8 rounded-full object-cover" />
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="animate-spin" size={20} />
            <h2 className="mt-2 text-cyan-300">Generating response...</h2>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <StarBorder as="div" className="bg-[#0f0f0f] p-4 rounded-b-xl" color="cyan" speed="5s">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-start gap-3 bg-gray-900 rounded-xl p-4 backdrop-blur-md border border-gray-700">
            <button className="text-gray-400 hover:text-white transition">
              <Link2 size={18} />
            </button>

            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={Input}
              name="prompt"
              id="prompt"
              className="w-full bg-transparent text-gray-100 placeholder:text-gray-500 outline-none resize-none h-24 md:h-28"
              placeholder="Type your prompt here..."
            />

            {Input && (
              <button
                onClick={() => onGenarate(Input)}
                className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-md cursor-pointer"
              >
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </StarBorder>
    </div>
  );
};

export default ChatView;
