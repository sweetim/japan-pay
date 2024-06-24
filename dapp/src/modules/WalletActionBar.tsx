import { jocTestnet } from "@/chains/joc"
import { useWalletAddress } from "@/hooks/useWalletAddress"
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BarcodeOutlined,
  ScanOutlined,
} from "@ant-design/icons"
import {
  Avatar,
  Modal,
  QRCode,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import {
  FC,
  useState,
} from "react"
import { Link } from "react-router-dom"

const WalletActionBar: FC = () => {
  const [ walletAddress ] = useWalletAddress()

  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  async function depositClickHandler() {
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-row justify-evenly bg-white rounded-3xl py-5 text-slate-600">
      <Modal
        className="p-5"
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space className="w-full py-2 mt-2" direction="vertical" align="center" size="middle">
          <Space>
            <Avatar src="https://www.gu-tech.com/hubfs/logomark.png"></Avatar>
            <p className="text-lg text-slate-500">{jocTestnet.name}</p>
          </Space>
          <QRCode size={256} value={walletAddress} />
          <div className="min-w-48 max-w-48">
            <Paragraph ellipsis copyable className="font-bold">{walletAddress}</Paragraph>
          </div>
          <p className="text-base text-slate-400">scan this QR code to deposit ERC20 token</p>
        </Space>
      </Modal>
      <Link to="scan">
        <div className="flex flex-col justify-center items-center">
          <ScanOutlined style={{ fontSize: "28px", color: "#eb473d" }} />
          <p>Scan</p>
        </div>
      </Link>
      <div onClick={depositClickHandler} className="flex flex-col justify-center items-center">
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
