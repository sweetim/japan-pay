import { Space } from "antd"
import { FC } from "react"

type BalanceCardProps = {
  title?: string
  balance: number
}

const BalanceCard: FC<BalanceCardProps> = ({ balance, title = "Balance" }) => {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <div className="bg-white w-full p-5 rounded-3xl ">
        <h1 className="text-slate-500 pb-2">{title}</h1>
        <h1 className="text-3xl font-bold text-center">
          {balance.toLocaleString()} <span className="text-2xl text-slate-600">JPYC</span>
        </h1>
      </div>
      {/* <QrReader constraints={{}} onResult={qrReaderResultHandler} className="w-full" /> */}
    </Space>
  )
}
export default BalanceCard
