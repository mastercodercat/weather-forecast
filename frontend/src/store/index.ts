import { create } from "zustand";
import { OptionType } from "../types";

type State = {
  history: OptionType[];
  addHistory: (location: OptionType) => void;
  removeHistory: (index: number) => void;
};

export const useStore = create<State>((set) => ({
  history: [],
  addHistory: (location) => set((state) => ({ history: [location, ...state.history] })),
  removeHistory: (index) => set((state) => ({ history: state.history.filter((_, i) => i !== index) })),
}));
