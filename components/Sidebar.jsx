"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Rocket,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
  const router = useRouter();

  const handleNewChat = () => {
    router.push("/"); // Navigate to home/chat page
  };

  return (
    <Sidebar>
      <SidebarTrigger className="absolute top-4 left-4" />

      {/* HEADER */}
      <SidebarHeader>
        <div className="flex flex-col items-center text-center p-4 gap-4">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <h2 className="text-xl font-bold">
            Sensai - Your AI Assistant for React Development
          </h2>
          <Button variant="outline" className="rounded-full gap-2" onClick={handleNewChat}>
            <Rocket className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-center">
            For any developing queries:
          </h2>
          <div className="flex flex-col items-center gap-4">
            <Link href="/docs" className="flex items-center gap-2 text-xl font-medium">
              <BookOpen className="w-5 h-5" /> Docs
            </Link>
            <Link href="/help" className="flex items-center gap-2 text-xl font-medium">
              <HelpCircle className="w-5 h-5" /> Help
            </Link>
          </div>
        </div>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <div className="flex flex-col items-center p-4 gap-4">
          <h2 className="text-2xl font-bold">Sensai</h2>
          <h3 className="text-lg font-semibold">Contact the Developer</h3>

          <div className="flex flex-col gap-2 w-full items-center">
            <Link href="mailto:Crushgaming990@gmail.com" className="w-full">
              <Button variant="outline" className="w-full justify-center gap-2 rounded-full">
                <Mail className="w-4 h-4" /> Email
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/daksh-gautam-03abb732b/" target="_blank" className="w-full">
              <Button variant="outline" className="w-full justify-center gap-2 rounded-full">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </Button>
            </Link>
            <Link href="https://github.com/DakshGautam101" target="_blank" className="w-full">
              <Button variant="outline" className="w-full justify-center gap-2 rounded-full">
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground text-center flex flex-col gap-1 mt-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
