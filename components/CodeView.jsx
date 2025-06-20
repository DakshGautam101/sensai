"use client";
import React, { useContext, useState, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { lookups } from '@/app/data/lookups';
import axios from 'axios';
import { MessagesContext } from '@/context/MessagesContext';
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

const CodeView = () => {
  const [activeTab, setActiveTab] = useState('Code');
  const [appCode, setAppCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { messages = [], setMessages } = useContext(MessagesContext);
  const params = useParams();
  const convex = useConvex();

  useEffect(() => {
    const fetchMessages = async () => {
      if (params?.id && messages.length === 0) {
        try {
          const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: params.id,
          });
          if (result?.messages) {
            setMessages(result.messages);
          }
        } catch (err) {
          console.error('Error fetching workspace messages:', err);
        }
      }
    };
    fetchMessages();
  }, [params?.id]);

  
    const GenerateAICode = async () => {
  try {
    if (isGenerating || !messages || messages.length < 2) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content) return; // 👈 Prevent invalid prompt

    setIsGenerating(true);

    const result = await axios.post('/api/codegenerate', {
      prompt: lastMessage.content
    });

      let code = '';
      if (Array.isArray(result.data.result)) {
        const appFile = result.data.result.find(f => f.filename === 'App.js' || f.filename === '/App.js' || f.filename === '/src/App.js');
        if (appFile) code = appFile.content;
      } else if (result.data?.result?.files) {
        if (result.data.result.files['/App.js']) {
          code = result.data.result.files['/App.js'].code;
        } else if (result.data.result.files['/src/App.js']) {
          code = result.data.result.files['/src/App.js'].code;
        }
      } else if (result.data?.result?.code) {
        code = result.data.result.code;
      }

      if (!/export\s+default/.test(code)) {
        code += '\n\nexport default function App() { return <div>App</div>; }';
      }
      setAppCode(code);

    } catch (error) {
      console.error('Error in GenerateAICode:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (messages.length >= 2) {
      const last = messages[messages.length - 1];
      const secondLast = messages[messages.length - 2];
      if (last?.role === 'assistant' && secondLast?.role === 'user') {
        GenerateAICode();
      }
    }
  }, [messages]);

  return (
    <div className="h-[80vh] rounded-md relative max-w-5xl w-full mx-auto">
      {isGenerating && (
        <div className="absolute inset-0 bg-black/50 z-50 flex flex-col items-center justify-center h-[80vh]">
          <span className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></span>
          <span className="mt-4 text-blue-300 font-medium text-sm">Generating code...</span>
        </div>
      )}

      <div className='bg-[#181818] w-full p-2 border rounded-md mb-2'>
        <div className='flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full'>
          <h2
            onClick={() => setActiveTab('Code')}
            className={`text-sm cursor-pointer ${activeTab === 'Code' ? 'text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full' : ''}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab('Preview')}
            className={`text-sm cursor-pointer ${activeTab === 'Preview' ? 'text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full' : ''}`}
          >
            Preview
          </h2>
        </div>
      </div>

      <div className='h-[78vh]'>
        <SandpackProvider
          template="react"
          theme="dark"
          files={{ '/App.js': { code: appCode } }}
          customSetup={{ dependencies: lookups.DEPENDENCIES }}
          options={{
            externalResources: ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4']
          }}
        >
          <SandpackLayout>
            {activeTab === 'Code' ? (
              <>
                <SandpackFileExplorer style={{ height: '78vh' }} />
                <SandpackCodeEditor style={{ height: '78vh' }} />
              </>
            ) : (
              <SandpackPreview style={{ height: '78vh' }} showNavigator={true} />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default CodeView;
