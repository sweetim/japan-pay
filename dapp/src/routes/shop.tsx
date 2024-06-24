import {
  JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  JPYC_CONTRACT_ADDRESS,
} from "@/contract"
import {
  useReadJpycBalanceOf,
  useWatchJapanPayShopPayEventEvent,
} from "@/generated"
import { useShopInfo } from "@/hooks/useShopsInfo"
import ShopQRCard from "@/modules/ShopQRCard"
import ItemContainer from "@/modules/common/ItemContainer"
import { Space } from "antd"
import {
  FC,
  useState,
} from "react"

const Shop: FC = () => {
  const { allShops } = useShopInfo()
  const [ logs, setLogs ] = useState<any[]>([])

  const { data: balance_jpyc, refetch } = useReadJpycBalanceOf({
    address: JPYC_CONTRACT_ADDRESS,
    args: [
      JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
    ],
  })

  useWatchJapanPayShopPayEventEvent({
    poll: true,
    pollingInterval: 1_000,
    address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
    onLogs(logs) {
      const logArgs = logs.map(item => item.args)
      console.log(logArgs)
      setLogs((prev) => {
        return [ ...logArgs, ...prev ]
      })
      refetch()
    },
  })

  return (
    <div className="p-2">
      <Space>
        <ItemContainer className="p-3">
          <p className="text-slate-500">Contract Address</p>
          <h1 className="text-lg font-bold">{JAPAN_PAY_SHOP_CONTRACT_ADDRESS}</h1>
        </ItemContainer>
        <ItemContainer className="p-3">
          <p className="text-slate-500">Balance</p>
          <h1 className="text-lg font-bold">
            {Number(balance_jpyc).toLocaleString()} <span className="text-sm text-slate-600">JPYC</span>
          </h1>
        </ItemContainer>
      </Space>
      <div className="flex flex-row flex-wrap py-2">
        {allShops?.map(shop => <ShopQRCard key={shop.id} {...shop} />)}
      </div>
      <ul>
        {logs.map(item => <li>{JSON.stringify(item)}</li>)}
      </ul>
    </div>
  )
}

export default Shop
