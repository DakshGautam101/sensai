"use client";
import React, { useContext, useState } from 'react';
import { ArrowRight, CloudCog, Link2, Loader2 } from 'lucide-react';
import { lookups } from '@/app/data/lookups';
import { MessagesContext } from '@/context/MessagesContext';
import { userDetailContext } from '@/context/UserDetailContext';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import StarBorder from '@/app/themes/StarBorder';

function Hero() {
    const [Input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { messages, setMessages } = useContext(MessagesContext);
    const { UserDetail, setUserDetail } = useContext(userDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();

    const onGenarate = async (input) => {
        if (!UserDetail?.name) {
            setOpenDialog(true);
            return;
        }

        try {
            setIsLoading(true);
            const msg = {
                role: "user",
                content: input
            }
            setMessages(msg);

            const workspaceId = await CreateWorkspace({
                user: UserDetail._id,
                messages: [msg]
            });
            
            // console.log(workspaceId);
            router.push(`/workspace/${workspaceId}?prompt=${encodeURIComponent(input)}`);
        } catch (error) {
            console.error('Error creating workspace:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center px-4 py-5 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    What do you want to build today?
                </h2>

                <p className="text-gray-400 text-lg font-medium">
                    Prompt, run, edit, and deploy your full stack application with AI
                </p>

                <StarBorder
                    as="div"
                    className="custom-class"
                    color="cyan"
                    speed="5s"
                >
                    <div className="w-full">
                        <div className="flex items-start gap-3 border border-gray-800 rounded-lg p-4 bg-gray-900/50 backdrop-blur-sm">
                            <div>
                                <button
                                    className="cursor-pointer p-1 text-gray-400 hover:text-white transition-colors rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                                >
                                    <Link2 size={18} />
                                </button>
                            </div>

                            <textarea
                                onChange={(e) => setInput(e.target.value)}
                                value={Input}
                                name="prompt"
                                id="prompt"
                                className="w-full bg-transparent resize-none outline-none text-gray-100 placeholder:text-gray-500 h-28 md:h-32"
                                placeholder="Type your prompt here..."
                                disabled={isLoading}
                            />

                            <div className="flex flex-col gap-2 items-center justify-between pt-1">
                                {Input && (
                                    <button
                                        onClick={() => onGenarate(Input)}
                                        disabled={isLoading}
                                        className={`cursor-pointer p-2 rounded-md transition text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                            isLoading 
                                                ? 'bg-blue-800 cursor-not-allowed' 
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <Loader2 size={24} className="animate-spin" />
                                        ) : (
                                            <ArrowRight size={24} />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-wrap max-w-3xl items-center justify-center gap-3 mt-3'>
                            {lookups.SUGGESTIONS.map((suggestion, index) => (
                                <h2
                                    key={index}
                                    onClick={() => !isLoading && onGenarate(suggestion)}
                                    className={`p-1 px-2 border rounded-full text-xs cursor-pointer ${
                                        isLoading 
                                            ? 'text-gray-600 cursor-not-allowed' 
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {suggestion}
                                </h2>
                            ))}
                        </div>
                    </div>
                </StarBorder>
            </div>
            <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(false)} />
        </div>
    );
}

export default Hero; 
