import { jocTestnet } from "@/chains/joc"
import {
  JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  JPYC_CONTRACT_ADDRESS,
} from "@/contract"
import {
  japanPayShopAbi,
  jpycAbi,
} from "@/generated"
import { useShopInfo } from "@/hooks/useShopsInfo"
import BalanceCard from "@/modules/BalanceCard"
import PaymentCard from "@/modules/PaymentCard"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import { Button } from "antd"
import { useState } from "react"
import {
  useLocation,
  useNavigate,
} from "react-router-dom"
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { QrCodePayload } from "./scan"

export default function AppPayment() {
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  const { allShopsObject } = useShopInfo()
  const { provider } = useWeb3Auth()
  const { state } = useLocation()
  const { id, amount } = state as QrCodePayload

  const shop = allShopsObject[id]

  async function payClickHandler() {
    if (provider) {
      setIsLoading(true)
      const privateKey = await provider.request({
        method: "eth_private_key",
      })

      const publicClient = createPublicClient({
        chain: jocTestnet,
        transport: http(),
      })

      const walletClient = createWalletClient({
        account: privateKeyToAccount(`0x${privateKey}` as any),
        chain: jocTestnet,
        transport: custom<IProvider>(provider),
      })

      await publicClient.waitForTransactionReceipt({
        hash: await walletClient.writeContract({
          abi: jpycAbi,
          address: JPYC_CONTRACT_ADDRESS,
          functionName: "approve",
          args: [
            JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
            BigInt(1_000_000 * Math.pow(10, 18)),
          ],
        }),
      })

      await publicClient.waitForTransactionReceipt({
        hash: await walletClient.writeContract({
          abi: japanPayShopAbi,
          address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
          functionName: "pay",
          args: [
            id,
            BigInt(amount),
          ],
        }),
      })

      setIsLoading(false)
      navigate("/app")
    }
  }

  return (
    <div className="h-full flex flex-col">
      <PaymentCard
        name={shop.name}
        amount={amount}
        iconUri={shop.iconUri}
      >
      </PaymentCard>
      <div className="px-3">
        <BalanceCard title="Wallet balance" balance={20000} />
      </div>

      <div className="mt-20 flex w-full justify-center">
        {isLoading
          ? <img src="/loading.gif" />
          : (
            <Button
              className="!px-32 !py-8"
              shape="round"
              size="large"
              onClick={payClickHandler}
            >
              <h1 className="text-xl">PAY</h1>
            </Button>
          )}
      </div>
    </div>
  )
}
