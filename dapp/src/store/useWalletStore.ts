import { IProvider } from "@web3auth/base"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type WalletStoreState = {
  provider: IProvider | null
  isLogin: boolean
}

type WalletStoreAction = {
  setWalletProvider: (provider: IProvider | null) => void
  setIsLogin: (isLogin: boolean) => void
}

export const useWalletStore = create<WalletStoreState & WalletStoreAction>()(
  immer((set) => ({
    provider: null as any,
    isLogin: false as boolean,
    setWalletProvider: (provider: IProvider | null) =>
      set((state) => {
        state.provider = provider
      }),
    setIsLogin: (isLogin: boolean) =>
      set((state) => {
        state.isLogin = isLogin
      }),
  })),
)
