import {
  Avatar,
  Space,
} from "antd"
import { FC } from "react"
import ItemContainer from "./common/ItemContainer"

type PaymentCardProps = {
  name: string
  iconUri: string
  amount: number
}

const PaymentCard: FC<PaymentCardProps> = ({ name, iconUri, amount }) => {
  return (
    <Space direction="vertical" size="middle" className="p-3 w-full">
      <div className="flex flex-row">
        <ItemContainer>
          <Avatar size={48} src={iconUri}></Avatar>
        </ItemContainer>
        <ItemContainer className="ml-2 w-full items-center">
          <h1 className="p-2 text-2xl font-bold">{name}</h1>
        </ItemContainer>
      </div>
      <div className="bg-white w-full p-5 rounded-3xl ">
        <h1 className="text-slate-500 pb-1">Amount</h1>
        <h1 className="text-3xl font-bold text-center">
          {amount.toLocaleString()} <span className="text-2xl text-slate-600">JPYC</span>
        </h1>
      </div>
    </Space>
  )
}
export default PaymentCard
