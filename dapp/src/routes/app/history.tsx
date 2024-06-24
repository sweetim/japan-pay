import TransactionList from "@/modules/TransactionList"
import { FC } from "react"

const History: FC = () => {
  return (
    <div className="h-full w-full bg-[#e2d9ca] flex flex-col">
      <h1 className="text-xl font-bold p-2">History</h1>
      <TransactionList />
    </div>
  )
}

export default History
