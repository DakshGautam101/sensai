import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Book, Ghost, Power, User } from 'lucide-react';
import { userDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { SidebarTrigger } from './ui/sidebar'; 
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import SignInDialog from './SignInDialog';
// import Threads from '@/app/themes/threads';

function Header() {
  const convex = useConvex();
  const { UserDetail, setUserDetail } = useContext(userDetailContext);
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const handleSignOut = async () => {
    try {
      if (UserDetail?.email) {
        await convex.mutation(api.users.signOut, {
          email: UserDetail.email
        });
      }
      // Clear local storage
      localStorage.removeItem('user');
      // Clear user context
      setUserDetail(null);
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 flex items-center justify-between p-4 border-b h-16 bg-black/30 backdrop-blur-sm border-gray-700 overflow-hidden z-50">
      {/* Logo */}
      <div className="flex items-center">
        {UserDetail?.name && <SidebarTrigger className='mr-4 scale-125' />}
      </div>
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="logo" width={100} height={100} className="h-8 w-auto" />
      </Link>
      <div className="flex-1" /> {/* Spacer to push buttons to the right */}

      {/* Right Buttons */}
      {!UserDetail?.name ? (
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="cursor-pointer text-white hover:bg-white/10"
            onClick={() => setOpenDialog(true)}
          >
            Sign in
          </Button>
          <Button 
            className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
            onClick={() => setOpenDialog(true)}
          >
            Get Started
          </Button>
        </div>
      ):(
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="cursor-pointer text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <Power className="w-4 h-4" />
          </Button>
          <Link href="/docs">
            <Button variant="ghost" className="cursor-pointer text-white hover:bg-white/10">
              <Book className="w-4 h-4" />
              <span className='ml-2'>Docs</span>
            </Button>
          </Link>
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            {UserDetail?.picture ? (
              <Image 
                src={UserDetail.picture} 
                alt="Profile" 
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          

          </div>
        </div>
      )}
      <SignInDialog openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
    </div>
  );
}

export default Header;
