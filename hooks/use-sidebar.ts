import { create } from "zustand";

interface SideBarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSideBar = create<SideBarStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}))