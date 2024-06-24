import QrScanner from "qr-scanner"
import {
  useEffect,
  useRef,
} from "react"
import { useNavigate } from "react-router-dom"

export type QrCodePayload = {
  id: string
  amount: number
}

export default function AppScan() {
  const navigate = useNavigate()
  const qrScanner = useRef<QrScanner | null>()
  const videoEl = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    ;(async () => {
      if (!videoEl.current) return

      qrScanner.current = new QrScanner(
        videoEl.current,
        onScanHandler,
        {
          highlightCodeOutline: true,
          highlightScanRegion: true,
        },
      )

      qrScanner.current.start()
    })()

    return () => {
      if (!qrScanner.current) return

      qrScanner.current.pause()
      qrScanner.current.stop()
      qrScanner.current.destroy()
    }
  }, [])

  async function onScanHandler(result: QrScanner.ScanResult) {
    const { data } = result
    console.log(data)
    const value: QrCodePayload = JSON.parse(data)
    navigate("/app/payment", { state: value })
  }

  return (
    <div className="w-full h-full">
      <video ref={videoEl} className="h-full object-cover"></video>
    </div>
  )
}
