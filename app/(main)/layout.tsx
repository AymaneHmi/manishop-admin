'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SideBar from '@/components/sidebar/SideBar';
import Header from '@/components/Header';
import { useSideBar } from '@/hooks/use-sidebar';

import ModalProvider from "@/providers/modal-provider";
import { useUser } from "@/hooks/use-user";
import Loader from "@/components/ui/loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const sideBar = useSideBar();
  const {user, loading, error} = useUser();

  const [isMount , setIsMount] = useState(true);
  const route = useRouter();
  
  useEffect(()=> {
    setIsMount(false)
  },[])
  
  if(isMount || loading){
    return <div className="flex flex-col items-center justify-center mt-10">
      <Loader isLoading />
    </div>;
  }

  if(!user || error) {
    route.push('/login')
    return;
  }

  return (
    <section className="relative flex">
      <ModalProvider />
      <SideBar />
      <section className={`ml-0 ${sideBar.isOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full transition-all duration-150`}>
        <Header />
        <section className="py-2 px-6">
          {children}
        </section>
      </section>
    </section>
  )
}
