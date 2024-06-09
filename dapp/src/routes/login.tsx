import { Button } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { WEB3_AUTH_CLIENT_ID } from "@/chains/joc"
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Web3Auth } from "@web3auth/modal"
import { useWalletStore } from "../store/useWalletStore"

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x15885970",
      rpcTarget: "https://rpc-1.testnet.japanopenchain.org:8545",
      displayName: "Japan Open Chain Testnet",
      blockExplorerUrl: "https://explorer.testnet.japanopenchain.org/",
      ticker: "JOCT",
      tickerName: "Japan Open Chain Testnet",
      isTestnet: true,
    },
  },
})

export const web3Auth = new Web3Auth({
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
})

export default function Login() {
  const navigate = useNavigate()
  const setWalletProvider = useWalletStore((state) => state.setWalletProvider)
  const setIsLogin = useWalletStore(state => state.setIsLogin)

  useEffect(() => {
    ;(async () => {
      try {
        await web3Auth.initModal()
        console.log("connected")
        console.log(web3Auth.provider)

        if (web3Auth.provider) {
          console.log("config")
          setWalletProvider(web3Auth.provider)
        }

        if (web3Auth.connected) {
          setIsLogin(true)
          console.log("loginn")
          navigate("/app")
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  async function loginClickHandler() {
    const web3AuthProvider = await web3Auth.connect()

    if (web3AuthProvider) {
      setWalletProvider(web3AuthProvider)
    }
  }

  async function logoutClickHandler() {
    await web3Auth.logout()
    setWalletProvider(null)
    setIsLogin(false)
  }

  return (
    <>
      <img src="/bg.jpg" alt="bg" />
      <h1>こんにちは</h1>
      <h1>Welcome to Japan</h1>
      <Button size="large" onClick={loginClickHandler}>Login</Button>
      <Button size="large" onClick={logoutClickHandler}>Logout</Button>
      <p>your one stop travelling payment app in Japan</p>
    </>
  )
}
