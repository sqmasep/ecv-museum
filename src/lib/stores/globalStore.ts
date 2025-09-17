import { create } from "zustand";

interface GlobalStore {
  isTransitionActive: boolean;
  setIsTransitionActive: (val: boolean) => void;
  isFirstLoad: boolean;
  setIsFirstLoad: (val: boolean) => void;
  pageToGoTo: string | null;
  setPageToGoTo: (page: string | null) => void;
  cursorInstance: any;
  setCursorInstance: (cursor: any) => void;
}

export const useGlobalStore = create<GlobalStore>()(set => ({
  isTransitionActive: false,
  setIsTransitionActive: isTransitionActive => set({ isTransitionActive }),

  isFirstLoad: true,
  setIsFirstLoad: isFirstLoad => set({ isFirstLoad }),

  pageToGoTo: null,
  setPageToGoTo: pageToGoTo => set({ pageToGoTo }),

  cursorInstance: null,
  setCursorInstance: cursorInstance => set({ cursorInstance }),
}));
