import { useWalletAddress } from "@/hooks/useWalletAddress"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Button,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import {
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"

export default function Account() {
  const navigate = useNavigate()

  const [ profileImage, setProfileImage ] = useState("")
  const [ walletAddress ] = useWalletAddress()

  const {
    logout,
    userInfo,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (userInfo && userInfo.profileImage) {
        setProfileImage(userInfo.profileImage)
      }
    })()
  })

  async function logoutClickHandler() {
    await logout()
    navigate("/")
  }

  return (
    <div className="w-full text-center mt-20">
      <Space direction="vertical" size="large" align="center">
        <Avatar size={128} src={profileImage} />
        <Paragraph copyable className="font-bold">{walletAddress}</Paragraph>
        <Button className="!px-10" shape="round" size="large" onClick={logoutClickHandler}>Logout</Button>
      </Space>
    </div>
  )
}
