import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const StableCoinsModule = buildModule("StableCoinsModule", (m) => {
  const jpyc = m.contract(
    "JPYC",
    [],
  )

  const usdt = m.contract(
    "USDT",
    [],
  )

  return { jpyc, usdt }
})

export default StableCoinsModule
