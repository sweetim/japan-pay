import { jocTestnet } from "@/chains/joc"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  useEffect,
  useState,
} from "react"
import {
  createWalletClient,
  custom,
} from "viem"

export function useWalletAddress() {
  const [ walletAddress, setWalletAddress ] = useState<`0x${string}`[]>([])
  const {
    provider,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (!provider) return

      const walletClient = createWalletClient({
        chain: jocTestnet,
        transport: custom<IProvider>(provider),
      })

      setWalletAddress(await walletClient.getAddresses())
    })()
  }, [ provider ])

  return walletAddress
}
