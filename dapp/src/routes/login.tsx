import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Button,
  Space,
} from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const {
    initModal,
    connect,
    isConnected,
    web3Auth,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      try {
        if (web3Auth) {
          await initModal()
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [ web3Auth ])

  useEffect(() => {
    if (isConnected) {
      navigate("/app")
    }
  }, [ isConnected ])

  async function loginClickHandler() {
    await connect()
  }

  return (
    <div>
      <img className="w-full" src="/bg.jpg" alt="bg" />
      <Space direction="vertical" size="large" className="p-3 w-full">
        <Space direction="vertical" size="small">
          <h1 className="text-3xl">こんにちは</h1>
          <h1 className="text-2xl text-slate-900">Welcome to Japan</h1>
          <p>your go to travelling payment app in Japan</p>
        </Space>
        <div className="flex justify-center w-full">
          <Button
            className="!px-16 !py-6"
            shape="round"
            size="large"
            onClick={loginClickHandler}
          >
            LOGIN
          </Button>
        </div>
      </Space>
    </div>
  )
}
