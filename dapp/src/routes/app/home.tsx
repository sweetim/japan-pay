import { useTokenBalance } from "@/hooks/useTokenBalance"
import BalanceCard from "@/modules/BalanceCard"
import WalletActionBar from "@/modules/WalletActionBar"
import {
  Avatar,
  List,
  Space,
} from "antd"
import { v4 as uuidv4 } from "uuid"

type PayLog = {
  id: string
  amount: number
  amountToPay: number
  timestamp: number
  shopIcon: string
  shopName: string
}

export default function AppHome() {
  const { amountJpy } = useTokenBalance()

  // async function payClickHandler() {
  //   console.log("here")
  //   console.log(web3Auth.provider)
  //   if (web3Auth.provider) {
  //     const privateKey = await web3Auth.provider.request({
  //       method: "eth_private_key",
  //     })

  //     const walletClient = createWalletClient({
  //       account: privateKeyToAccount(`0x${privateKey}` as any),
  //       chain: jocTestnet,
  //       // chainId: 0x2761,
  //       transport: custom<IProvider>(web3Auth.provider),
  //     })

  //     await walletClient.writeContract({
  //       abi: jpycAbi,
  //       address: JPYC_CONTRACT_ADDRESS,
  //       functionName: "approve",
  //       args: [
  //         JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  //         BigInt(1_000_000 * Math.pow(10, 18)),
  //       ],
  //     })
  //     console.log("done")
  //     // await walletClient.writeContract({
  //     //   abi: japanPayShopAbi,
  //     //   address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  //     //   functionName: "pay",
  //     //   args: [
  //     //     uuidv4(),
  //     //     BigInt(10_800),
  //     //   ],
  //     // })
  //   }

  //   // await approveWriteContract({
  //   //   address: JPYC_CONTRACT_ADDRESS,
  //   //   args: [
  //   // JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  //   // BigInt(1_000_000 * Math.pow(10, 18)),
  //   //   ],
  //   // })

  //   // await writeContractAsync({
  //   //   address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  //   //   args: [
  //   //     uuidv4(),
  //   //     BigInt(10_800),
  //   //   ],
  //   // })
  //   // console.log("done")
  // }

  const transactionData: PayLog[] = [
    {
      id: uuidv4(),
      amount: 10_800,
      amountToPay: 10_000,
      timestamp: Date.now(),
      shopIcon:
        "data:image/png;base64,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",
      shopName: "Gucci",
    },
    {
      id: uuidv4(),
      amount: 30_800,
      amountToPay: 28518.51,
      timestamp: Date.now(),
      shopIcon:
        "data:image/png;base64,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",
      shopName: "Matsumoto KiYoshi",
    },
    {
      id: uuidv4(),
      amount: 5_400,
      amountToPay: 5_000,
      timestamp: Date.now(),
      shopIcon: "https://cdn.worldvectorlogo.com/logos/uniqlo.svg",
      shopName: "Uniqlo",
    },
  ]

  return (
    <div className="h-full w-full bg-[#e2d9ca] p-2">
      <Space direction="vertical" className="w-full" size="middle">
        <BalanceCard balance={amountJpy} />
        <BalanceCard
          title="Saving from tax free"
          balance={transactionData.reduce((acc, item) => acc + (item.amount - item.amountToPay), 0)}
        />
        <WalletActionBar />
        <h1 className="text-xl">Transaction</h1>
        {/* <button onClick={payClickHandler}>Pay</button> */}
        <List
          itemLayout="horizontal"
          dataSource={transactionData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.shopIcon} />}
                title={item.shopName}
                description={`${(item.amount - item.amountToPay).toLocaleString()} JPY`}
              />
              <div className="text-xl font-bold">{item.amountToPay.toLocaleString()}</div>
            </List.Item>
          )}
        />
      </Space>
    </div>
  )
}
