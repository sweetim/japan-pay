import { useTokenBalance } from "@/hooks/useTokenBalance"
import BalanceCard from "@/modules/BalanceCard"
import {
  Avatar,
  List,
  Space,
} from "antd"

export default function Wallet() {
  const { tokensData, amountJpy } = useTokenBalance()

  return (
    <Space direction="vertical" size="large" className="w-full">
      <div className="w-full p-2">
        <BalanceCard balance={amountJpy} />
      </div>
      <Space direction="vertical" className="w-full">
        <h1>
          <strong>Tokens</strong>
        </h1>
        <List
          itemLayout="horizontal"
          dataSource={tokensData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={item.title}
                description={item.description}
              />
              <h2 className="text-xl font-bold">{item.amount?.toLocaleString()}</h2>
            </List.Item>
          )}
        />
      </Space>
    </Space>
  )
}
