'use client';

import { useSideBar } from "@/hooks/use-sidebar";
import SidebarLinks from "./SidebarLinks";
import SidebarHeader from "./SidebarHeader";
import SidebarUser from "./SideBarUser";

const SideBar = () => {

    const SideBar = useSideBar();
    return (
       <aside className={`text-black bg-gray-50 h-screen hidden lg:block fixed top-0 left-0 border-r shadow-3xl overflow-x-hidden transition-all duration-150 z-[20]
       ${SideBar.isOpen ? 'w-1/5' : 'w-18'}
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