'use client';

import  useCookie  from "@/hooks/use-cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {Toaster} from 'react-hot-toast';

import SideBar from '@/components/sidebar/SideBar';
import Header from '@/components/Header';
import { useSideBar } from '@/hooks/use-sidebar';

import ModalProvider from "@/providers/modal-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const sideBar = useSideBar();

  // const token = useCookie('ms_admin_user_token');
  const [isMount , setIsMount] = useState(true);
  const route = useRouter();
  
  useEffect(()=> {
    setIsMount(false)
  },[])
  
  if(isMount){
    return null;
  }
  const token = sessionStorage.getItem('ms_admin_user_token');

  if(!token) {
    route.push('/login')
    return;
  }

  return (
    <section className="relative flex">
      <Toaster />
      <ModalProvider />
      <SideBar />
      <section className={`${sideBar.isOpen ? 'ml-o md:ml-[20%]' : 'ml-0'} w-full transition-all duration-150`}>
        <Header />
        <section className="py-2 px-6">
          {children}
        </section>
      </section>
    </section>
  )
}
