import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const JapanPayShopModule = buildModule("JapanPayShopModule", (m) => {
  const japanPayShop = m.contract(
    "JapanPayShop",
    [],
  )

  return { japanPayShop }
})

export default JapanPayShopModule
