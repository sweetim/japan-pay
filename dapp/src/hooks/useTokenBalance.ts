import { jocTestnet } from "@/chains/joc"
import {
  JPYC_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "@/contract"
import {
  useReadJpycBalanceOf,
  useReadUsdtBalanceOf,
} from "@/generated"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createPublicClient,
  http,
} from "viem"

const USDT_JPYC_CONVERSION = 156.9
const walletAddress = "0xeC1C571c8B817f9BC91C2cD55F4898f304EbdB5b"

export function useTokenBalance() {
  const [ joctBalance, setJoctBalance ] = useState(0)

  const { data: jpycBalance } = useReadJpycBalanceOf({
    address: JPYC_CONTRACT_ADDRESS,
    args: [
      walletAddress,
    ],
  })

  const { data: usdtBalance } = useReadUsdtBalanceOf({
    address: USDT_CONTRACT_ADDRESS,
    args: [
      walletAddress,
    ],
  })

  useEffect(() => {
    ;(async () => {
      const publicClient = createPublicClient({
        chain: jocTestnet,
        transport: http(),
      })

      const balance = await publicClient.getBalance({
        address: walletAddress,
      })

      setJoctBalance(Number(balance))
    })()
  }, [])

  const tokensData = useMemo(() => {
    return [
      {
        title: "JOCT",
        amount: (joctBalance / Math.pow(10, 18)).toFixed(3),
        image: "https://www.gu-tech.com/hubfs/logomark.png",
        description: "1 JPYC",
      },
      {
        title: "USDT",
        amount: usdtBalance,
        image: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
        description: `${USDT_JPYC_CONVERSION} JPYC`,
      },
      {
        title: "JPYC",
        amount: jpycBalance,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
        description: "1 JPYC",
      },
    ]
  }, [ usdtBalance, jpycBalance, joctBalance ])

  const amountJpy = useMemo(() => {
    return Number(usdtBalance) * USDT_JPYC_CONVERSION + Number(jpycBalance)
  }, [ usdtBalance, jpycBalance ])

  return {
    amountJpy,
    tokensData,
  }
}
