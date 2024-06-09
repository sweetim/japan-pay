import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import "./index.css"
import {
  Account,
  Login,
  Root,
  Wallet,
} from "./routes"
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
            element: <Wallet />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
