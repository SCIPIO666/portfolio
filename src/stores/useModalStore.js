import { create } from 'zustand'

export const useModalStore = create((set) => ({
  project: null,
  openModal: (project) => set({ project }),
  closeModal: () => set({ project: null }),
}))