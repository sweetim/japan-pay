import { WEB3_AUTH_CLIENT_ID } from "@/chains/joc"
import { useWalletStore } from "@/store/useWalletStore"
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Web3Auth } from "@web3auth/modal"
import { useEffect } from "react"

import { JPYs_CONTRACT_ADDRESS } from "@/contract"
import { useReadJpYsBalanceOf } from "@/generated"

const jocChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x15885970",
  rpcTarget: "https://rpc-1.testnet.japanopenchain.org:8545",
  displayName: "Japan Open Chain Testnet",
  blockExplorerUrl: "https://explorer.testnet.japanopenchain.org/",
  ticker: "JOCT",
  tickerName: "Japan Open Chain Testnet",
  isTestnet: true,
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: jocChainConfig },
})

const web3auth = new Web3Auth({
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
})

export default function Wallet() {
  const { data: jpysBalance } = useReadJpYsBalanceOf({
    address: JPYs_CONTRACT_ADDRESS,
  })

  const provider = useWalletStore(state => state.provider)

  useEffect(() => {
    ;(async () => {
      // const user = await web3auth.getUserInfo()
      // console.log(user)

      if (provider) {
      }
    })()
  }, [])

  return (
    <div>
      <h2>Balance</h2>
      <p>{jpysBalance}</p>
    </div>
  )
}
