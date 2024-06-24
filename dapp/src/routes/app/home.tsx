import { JAPAN_PAY_SHOP_CONTRACT_ADDRESS } from "@/contract"
import { useReadJapanPayShopGetAllPayLogs } from "@/generated"
import { useShopInfo } from "@/hooks/useShopsInfo"
import { useTokenBalance } from "@/hooks/useTokenBalance"
import { useWalletAddress } from "@/hooks/useWalletAddress"
import BalanceCard from "@/modules/BalanceCard"
import TransactionList from "@/modules/TransactionList"
import WalletActionBar from "@/modules/WalletActionBar"
import { Space } from "antd"

type TransactionLog = {
  id: string
  amount: number
  amountToPay: number
  timestamp: number
  shopIcon: string
  shopName: string
}

export default function AppHome() {
  const { amountJpy } = useTokenBalance()
  const [ walletAddress ] = useWalletAddress()
  const { allShopsObject } = useShopInfo()

  const { data: allPayLogs } = useReadJapanPayShopGetAllPayLogs({
    address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
    args: [
      walletAddress,
    ],
  })

  const transactionData = allPayLogs?.map<TransactionLog>(log => ({
    id: log.id,
    amount: Number(log.amount),
    amountToPay: Number(log.amountToPay),
    timestamp: Number(log.timestamp),
    shopIcon: allShopsObject[log.id].iconUri,
    shopName: allShopsObject[log.id].name,
  }))

  if (transactionData) {
    transactionData.sort((a, b) => b.timestamp - a.timestamp)
  }

  const savingFromTaxBalance = transactionData?.reduce((acc, item) => acc + (item.amount - item.amountToPay), 0) || 0

  return (
    <div className="h-full w-full bg-[#e2d9ca] flex flex-col">
      <Space direction="vertical" className="w-full h-full p-2" size="middle">
        <BalanceCard balance={amountJpy} />

        <BalanceCard
          title="Saving from tax free"
          balance={savingFromTaxBalance}
        />
        <WalletActionBar />
        <h1 className="text-xl">Transaction</h1>
      </Space>
      <TransactionList />
    </div>
  )
}
