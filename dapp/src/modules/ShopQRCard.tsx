import { QrCodePayload } from "@/routes/app/scan"
import { ArrowClockwise } from "@phosphor-icons/react"
import {
  Avatar,
  Button,
  QRCode,
} from "antd"
import {
  FC,
  useState,
} from "react"
import ItemContainer from "./common/ItemContainer"

type ShopQRCardProps = {
  iconUri: string
  name: string
  id: string
}

const ShopQRCard: FC<ShopQRCardProps> = ({ name, id, iconUri }) => {
  const [ qrCodePayload, setQrCodePayload ] = useState<QrCodePayload>({
    id,
    amount: Math.floor(Math.random() * 50_000),
  })

  async function refreshClickHandler() {
    console.log(id)
    setQrCodePayload({
      id,
      amount: Math.floor(Math.random() * 50_000),
    })
  }

  return (
    <div className="flex-1 p-3 bg-[#595651] rounded-2xl m-1">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <ItemContainer className="max-w-fit">
            <Avatar size={48} src={iconUri}></Avatar>
          </ItemContainer>
          <ItemContainer className="ml-2 w-full items-center">
            <h1 className="p-2 text-2xl font-bold">{name}</h1>
          </ItemContainer>
        </div>
        <ItemContainer className="flex flex-row justify-center my-2">
          <div className="flex flex-col text-center">
            <QRCode size={256} value={JSON.stringify(qrCodePayload)} />
            <div className="w-full flex flex-row justify-center p-2">
              <p className="text-bold text-2xl px-3">
                {qrCodePayload.amount.toLocaleString()} <span className="text-sm text-slate-600">JPYC</span>
              </p>
              <Button
                onClick={refreshClickHandler}
                type="default"
                shape="round"
                icon={<ArrowClockwise />}
              />
            </div>
          </div>
        </ItemContainer>
      </div>
    </div>
  )
}

export default ShopQRCard
