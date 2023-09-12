'use client';

import { useSideBar } from "@/hooks/use-sidebar";
import SidebarLinks from "./SidebarLinks";
import SidebarHeader from "./SidebarHeader";
import SidebarUser from "./SideBarUser";

const SideBar = () => {

    const SideBar = useSideBar();
    return (
       <aside className={`bg-br_secondary h-screen fixed top-0 left-0 shadow-3xl overflow-x-hidden transition-all duration-150 z-[20]
       ${SideBar.isOpen ? 'w-4/5 md:w-1/5' : 'w-0'}
       `}>
            <div className="w-full flex flex-col items-center justify-between h-full py-2 px-4">
                <div className="w-full flex flex-col items-center gap-4">
                    <SidebarHeader />
                    <SidebarLinks />
                </div>
                <SidebarUser />
            </div>
       </aside>
    )
}
export default SideBar;