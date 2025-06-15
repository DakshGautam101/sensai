"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import { MessagesContext } from "@/context/MessagesContext";
import { userDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function ThemeProviderWrapper({ children }) {
  const [messages, setMessages] = useState([]);
  const [UserDetail, setUserDetail] = useState();
  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.email) {
        try {
          const result = await convex.query(api.users.GetUser, {
            email: user.email,
          });
          // console.log("User fetched:", result);
          setUserDetail(result); // You probably want to store it
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    }
  };

  console.log('ThemeProviderWrapper rendered, Messages:', messages);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <userDetailContext.Provider value={{ UserDetail, setUserDetail }}>
          <SidebarProvider defaultOpen={false}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div>
                <Header />
                <div>
                  {UserDetail && <AppSidebar className="z-10" />}
                  <main className='ml-[300px]'>
                    {children}
                  </main>
                </div>
              </div>
            </ThemeProvider>
          </SidebarProvider>
        </userDetailContext.Provider>
      </MessagesContext.Provider>
    </GoogleOAuthProvider>
  );
}
