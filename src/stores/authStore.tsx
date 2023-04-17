import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";
import { LoginResponse } from "../services/auth/types";

export interface AuthStoreState {
  auth?: LoginResponse;
  setAuth: (auth: LoginResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        auth: undefined,
        setAuth: (auth) => set({ auth }),
        clearAuth: () => set({ auth: undefined }),
      }),
      {
        name: "eservice-portal-auth-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
