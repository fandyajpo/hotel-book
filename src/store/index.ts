import { User } from "firebase/auth";
import { create } from "zustand";

interface BearValue {
  user?: User;
}

interface BearState extends BearValue {
  dispatch: (args: BearValue) => void;
}

const initial = {
  user: undefined,
};

// ITS VERY EASY NA USE
export const useStore = create<BearState>((set) => ({
  ...initial,
  dispatch: (by: BearValue) => set(() => by),
}));
