import { JAPAN_PAY_SHOP_CONTRACT_ADDRESS } from "@/contract"
import { useReadJapanPayShopGetAllPayLogs } from "@/generated"
import { useShopInfo } from "@/hooks/useShopsInfo"
import { useTokenBalance } from "@/hooks/useTokenBalance"
import { useWalletAddress } from "@/hooks/useWalletAddress"
import BalanceCard from "@/modules/BalanceCard"
import TransactionList from "@/modules/TransactionList"
import WalletActionBar from "@/modules/WalletActionBar"
import ItemContainer from "@/modules/common/ItemContainer"
import { Gift } from "@phosphor-icons/react"
import {
  Carousel,
  ConfigProvider,
  Modal,
  Space,
  theme,
} from "antd"
import {
  useEffect,
  useState,
} from "react"

type TransactionLog = {
  id: string
  amount: number
  amountToPay: number
  timestamp: number
  shopIcon: string
  shopName: string
}

export default function AppHome() {
  const { amountJpy, isSuccess } = useTokenBalance()
  const [ walletAddress ] = useWalletAddress()
  const { allShopsObject } = useShopInfo()
  const [ isAirDropSuccess, setIsAirDropSucess ] = useState(false)

  const { data: allPayLogs } = useReadJapanPayShopGetAllPayLogs({
    address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
    args: [
      walletAddress,
    ],
  })

  const transactionData = allPayLogs?.map<TransactionLog>(log => ({
    id: log.id,
    amount: Number(log.amount),
    amountToPay: Number(log.amountToPay),
    timestamp: Number(log.timestamp),
    shopIcon: allShopsObject[log.id].iconUri,
    shopName: allShopsObject[log.id].name,
  }))

  if (transactionData) {
    transactionData.sort((a, b) => b.timestamp - a.timestamp)
  }

  const savingFromTaxBalance = transactionData?.reduce((acc, item) => acc + (item.amount - item.amountToPay), 0) || 0

  useEffect(() => {
    ;(async () => {
      if (!walletAddress) return
      if (!isSuccess) return
      if (amountJpy > 0) return
      console.log("new user sign up bonus")
      const res = await fetch(
        "https://japan-pay.vercel.app/api/faucet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: walletAddress,
          }),
        },
      )

      const result = await res.text()
      console.log(result)
      setIsAirDropSucess(true)
    })()
  }, [ amountJpy, walletAddress ])

  useEffect(() => {
    if (isAirDropSuccess) {
      setIsModalOpen(true)
    }
  }, [ isAirDropSuccess ])

  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="h-full w-full bg-[#e2d9ca] flex flex-col">
      <Modal
        className="p-5"
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Carousel className="!text-black w-full py-5">
            <div className="w-full">
              <Space direction="vertical" className="w-full py-3" align="center">
                <Gift size={128} color="#f00" weight="fill" />
                <h2 className="font-bold text-xl">Congratulation!</h2>
                <p>as a welcome gift for signing up Japan Pay</p>
                <p>you are rewarded with</p>
                <div className="py-3">
                  <h1 className="text-4xl">
                    {Number(100_000).toLocaleString()} <span className="text-2xl text-slate-600">JPYC</span>
                  </h1>
                </div>
                <p>have a great travel time with us in Japan</p>
                <p>ありがとうございます</p>
              </Space>
            </div>
            <div className="w-full">
              <Space direction="vertical" className="w-full py-5" align="center">
                <img className="w-20 h-20 p-2" src="/logo.png" alt="logo" />
                <h2 className="font-bold text-xl pb-2">Japan Pay</h2>
                <Space direction="vertical" className="w-full" size="middle">
                  <ItemContainer className="bg-[#e0d9cc] w-full">
                    <p className="p-2">enjoy the best tax free shopping exprience</p>
                  </ItemContainer>
                  <ItemContainer className="bg-[#e0d9cc] w-full">
                    <p className="p-2">enjoy greatest discout with us</p>
                  </ItemContainer>
                  <ItemContainer className="bg-[#e0d9cc] w-full">
                    <p className="p-2">convenient payment scan and pay</p>
                  </ItemContainer>
                </Space>
              </Space>
            </div>
          </Carousel>
        </ConfigProvider>
      </Modal>
      <Space direction="vertical" className="w-full h-full p-2" size="middle">
        <BalanceCard balance={100_000} />

        <BalanceCard
          title="Saving from tax free"
          balance={savingFromTaxBalance}
        />
        <WalletActionBar />
        <h1 className="text-xl">Transaction</h1>
      </Space>
      <TransactionList />
    </div>
  )
}
