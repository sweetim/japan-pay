import { useWalletStore } from "@/store/useWalletStore"
import {
  useEffect,
  useMemo,
} from "react"

import {
  JPYC_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "@/contract"
import {
  useReadJpycBalanceOf,
  useReadUsdtBalanceOf,
} from "@/generated"
import {
  Avatar,
  List,
  Space,
} from "antd"

export default function Wallet() {
  const walletAddress = "0xeC1C571c8B817f9BC91C2cD55F4898f304EbdB5b"

  const { data: jpysBalance } = useReadJpycBalanceOf({
    address: JPYC_CONTRACT_ADDRESS,
    args: [
      walletAddress,
    ],
  })

  const { data: usdtBalance } = useReadUsdtBalanceOf({
    address: USDT_CONTRACT_ADDRESS,
    args: [
      walletAddress,
    ],
  })

  const provider = useWalletStore(state => state.provider)

  useEffect(() => {
    ;(async () => {
      // const user = await web3auth.getUserInfo()
      // console.log(user)

      if (provider) {
      }
    })()
  }, [])

  const tokensData = useMemo(() => {
    return [
      {
        title: "USDT",
        amount: usdtBalance,
        image: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
      },
      {
        title: "JPYC",
        amount: jpysBalance,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
      },
    ]
  }, [ usdtBalance, jpysBalance ])

  return (
    <div>
      <div className="my-10 bg-white w-full p-5 rounded-3xl">
        <Space direction="vertical">
          <h1 className="text-2xl">Account</h1>
          <p>{walletAddress}</p>
        </Space>
      </div>
      <h1>
        <strong>Tokens</strong>
      </h1>
      <List
        itemLayout="horizontal"
        dataSource={tokensData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={item.title}
            />
            <h2>{item.amount?.toString()}</h2>
          </List.Item>
        )}
      />
    </div>
  )
}
