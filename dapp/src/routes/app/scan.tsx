import {
  IDetectedBarcode,
  Scanner,
} from "@yudiel/react-qr-scanner"
import { useNavigate } from "react-router-dom"

export type QrCodePayload = {
  id: string
  amount: number
}

export default function AppScan() {
  const navigate = useNavigate()

  async function onScanHandler(result: IDetectedBarcode[]) {
    if (result.length > 0) {
      const { rawValue } = result[0]
      const value: QrCodePayload = JSON.parse(rawValue)

      navigate("/app/payment", { state: value })
    }
  }

  return (
    <div className="h-full w-screen mx-[-8px]">
      <Scanner
        styles={{
          container: {
            height: "100%",
            width: "100%",
          },
          video: {
            height: "100%",
            width: "100%",
          },
        }}
        constraints={{
          aspectRatio: {
            ideal: 0,
          },
        }}
        onScan={onScanHandler}
      />
    </div>
  )
}
