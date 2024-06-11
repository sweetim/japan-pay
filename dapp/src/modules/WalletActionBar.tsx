import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BarcodeOutlined,
  ScanOutlined,
} from "@ant-design/icons"
import { FC } from "react"
import { Link } from "react-router-dom"

const WalletActionBar: FC = () => {
  return (
    <div className="flex flex-row justify-evenly bg-white rounded-3xl py-5 text-slate-600">
      <Link to="scan">
        <div className="flex flex-col justify-center items-center">
          <ScanOutlined style={{ fontSize: "28px", color: "#eb473d" }} />
          <p>Scan</p>
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <ArrowDownOutlined style={{ fontSize: "28px", color: "#eb473d" }} />
        <p>Deposit</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ArrowUpOutlined style={{ fontSize: "28px", color: "#eb473d" }} />
        <p>Send</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <BarcodeOutlined style={{ fontSize: "28px", color: "#eb473d" }} />
        <p>Code</p>
      </div>
    </div>
  )
}

export default WalletActionBar
