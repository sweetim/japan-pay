import { JAPAN_PAY_SHOP_CONTRACT_ADDRESS } from "@/contract"
import { useReadJapanPayShopGetAllShops } from "@/generated"
import { useMemo } from "react"

export function useShopInfo() {
  const { data: allShops } = useReadJapanPayShopGetAllShops({
    address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
  })

  const allShopsObject = useMemo(() => {
    if (!allShops) return {}

    return Object.fromEntries(allShops.map(({ id, ...others }) => [ id, others ]))
  }, [ allShops ])

  return {
    allShops,
    allShopsObject,
  }
}
