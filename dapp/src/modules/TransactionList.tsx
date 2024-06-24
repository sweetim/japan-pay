import { JAPAN_PAY_SHOP_CONTRACT_ADDRESS } from "@/contract"
import { useReadJapanPayShopGetAllPayLogs } from "@/generated"
import { useShopInfo } from "@/hooks/useShopsInfo"
import { useWalletAddress } from "@/hooks/useWalletAddress"
import {
  Avatar,
  List,
  Space,
  Tag,
} from "antd"
import { FC } from "react"

type TransactionLog = {
  id: string
  amount: number
  amountToPay: number
  timestamp: number
  shopIcon: string
  shopName: string
}

const TransactionList: FC = () => {
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

  return (
    <div className=" h-full flex flex-col overflow-y-auto px-2">
      <List
        itemLayout="horizontal"
        dataSource={transactionData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.shopIcon} />}
              title={item.shopName}
              description={
                <Space size="small" direction="vertical">
                  <p color="red">{(new Date(item.timestamp * 1000)).toLocaleString()}</p>
                  {(item.amount - item.amountToPay) === 0
                    ? null
                    : <Tag color="red">{(item.amount - item.amountToPay).toLocaleString()} JPY</Tag>}
                </Space>
              }
            />
            <div className="text-xl font-bold">{item.amountToPay.toLocaleString()}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TransactionList
