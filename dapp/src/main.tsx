import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import {
  Web3AuthContextConfig,
  Web3AuthInnerContext,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks"
import {
  createConfig,
  http,
  WagmiProvider,
} from "wagmi"

import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Web3AuthOptions } from "@web3auth/modal"
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin"
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks"
import {
  jocTestnet,
  WEB3_AUTH_CLIENT_ID,
} from "./chains/joc"
import "./index.css"
import {
  Account,
  Login,
  Root,
  Wallet,
} from "./routes"
import AppHome from "./routes/app/home"
import AppPayment from "./routes/app/payment"
import AppRoot from "./routes/app/root"
import AppScan from "./routes/app/scan"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "app",
        element: <AppRoot />,
        children: [
          {
            path: "",
            element: <AppHome />,
          },
          {
            path: "scan",
            element: <AppScan />,
          },
          {
            path: "payment",
            element: <AppPayment />,
          },
          {
            path: "wallet",
            element: <Wallet />,
          },
          {
            path: "account",
            element: <Account />,
          },
        ],
      },
    ],
  },
])

const config = createConfig({
  chains: [ jocTestnet ],
  transports: {
    [jocTestnet.id]: http(),
  },
})

const queryClient = new QueryClient()

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      // chainId: "0x15885970",
      chainId: "0x2761",
      rpcTarget: "https://rpc-1.testnet.japanopenchain.org:8545",
      displayName: "Japan Open Chain Testnet",
      blockExplorerUrl: "https://explorer.testnet.japanopenchain.org/",
      ticker: "JOCT",
      tickerName: "Japan Open Chain Testnet",
      isTestnet: true,
    },
  },
})

export const web3AuthOptions: Web3AuthOptions = {
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
}
const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: { whiteLabel: { showWidgetButton: true } },
})

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
  // adapters: [ openloginAdapter ],
  plugins: [ walletServicesPlugin ],
  // plugins: [],
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </WagmiProvider>
      </WalletServicesProvider>
    </Web3AuthProvider>
  </React.StrictMode>,
)
