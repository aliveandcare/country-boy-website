import { create } from 'zustand';

interface ModalState {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isQuoteModalOpen: false,
  openQuoteModal: () => set({ isQuoteModalOpen: true }),
  closeQuoteModal: () => set({ isQuoteModalOpen: false }),
}));