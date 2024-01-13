import { User } from "firebase/auth";
import { create } from "zustand";

interface BearValue {
  user?: User | null | undefined;
}

interface BearState extends BearValue {
  dispatch: (args: BearValue) => void;
}

const initial = {
  user: undefined,
};

export const useStore = create<BearState>((set) => ({
  ...initial,
  dispatch: (by: BearValue) => set(() => by),
}));
