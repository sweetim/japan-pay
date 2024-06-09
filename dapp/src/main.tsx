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
  createConfig,
  http,
  WagmiProvider,
} from "wagmi"
import { jocTestnet } from "./chains/joc"
import "./index.css"
import {
  Account,
  Login,
  Root,
  Wallet,
} from "./routes"
import AppHome from "./routes/app/home"
import AppRoot from "./routes/app/root"

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
