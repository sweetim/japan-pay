import { jocTestnet } from "@/chains/joc"
import { useWalletStore } from "@/store/useWalletStore"
import { IProvider } from "@web3auth/base"
import {
  Avatar,
  Button,
  Space,
} from "antd"
import {
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import {
  createWalletClient,
  custom,
} from "viem"
import { web3Auth } from "../login"

export default function Account() {
  const navigate = useNavigate()

  const [ address, setAddress ] = useState("")
  const [ profileImage, setProfileImage ] = useState("")

  const provider = useWalletStore(state => state.provider)

  useEffect(() => {
    ;(async () => {
      console.log(provider)
      if (!provider) return

      const walletClient = createWalletClient({
        chain: jocTestnet,
        transport: custom<IProvider>(provider),
      })

      const [ address ] = await walletClient.getAddresses()
      setAddress(address)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const user = await web3Auth.getUserInfo()

      if (user.profileImage) {
        setProfileImage(user.profileImage)
      }
    })()
  })

  async function logoutClickHandler() {
    await web3Auth.logout()
    navigate("/")
  }

  return (
    <div className="w-full text-center mt-20">
      <Space direction="vertical" size="large" align="center">
        <Avatar size={128} src={profileImage} />
        <h1 className="font-bold">{address}</h1>
        <Button className="!px-10" shape="round" size="large" onClick={logoutClickHandler}>Logout</Button>
      </Space>
    </div>
  )
}
