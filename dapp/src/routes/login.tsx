import {
  Button,
  Space,
} from "antd"
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
      // chainId: "0x2761",
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
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
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

        if (web3Auth.provider) {
          console.log("config")
          setWalletProvider(web3Auth.provider)

          navigate("/app")
        }

        if (web3Auth.connected) {
          setIsLogin(true)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [ web3Auth ])

  async function loginClickHandler() {
    const web3AuthProvider = await web3Auth.connect()

    if (web3AuthProvider) {
      setWalletProvider(web3AuthProvider)
    }
  }

  return (
    <div>
      <img className="w-full" src="/bg.jpg" alt="bg" />
      <Space direction="vertical" size="large" className="p-3 w-full">
        <Space direction="vertical" size="small">
          <h1 className="text-3xl">こんにちは</h1>
          <h1 className="text-2xl text-slate-900">Welcome to Japan</h1>
          <p>your go to travelling payment app in Japan</p>
        </Space>
        <div className="flex justify-center w-full">
          <Button
            className="!px-16 !py-6"
            shape="round"
            size="large"
            onClick={loginClickHandler}
          >
            LOGIN
          </Button>
        </div>
      </Space>
    </div>
  )
}
