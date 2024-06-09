import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { Abi } from "viem"
import { abi as JPYsAbi } from "./abis/JPYs.json"
import { abi as USDTAbi } from "./abis/USDT.json"

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "JPYs",
      abi: JPYsAbi as Abi,
    },
    {
      name: "USDT",
      abi: USDTAbi as Abi,
    },
  ],
  plugins: [
    react(),
  ],
})
