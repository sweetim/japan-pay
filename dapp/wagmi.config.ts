import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { Abi } from "viem"
import { abi as JPYCAbi } from "./abis/JPYC.json"
import { abi as USDTAbi } from "./abis/USDT.json"

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "JPYC",
      abi: JPYCAbi as Abi,
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
