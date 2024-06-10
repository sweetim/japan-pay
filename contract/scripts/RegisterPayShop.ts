import "dotenv/config"

import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"

import hre from "hardhat"
import { jocTestnet } from "../chains/joc"

const JAPAN_PAY_SHOP_CONTRACT_ADDRESS = process.env.JAPAN_PAY_SHOP_CONTRACT_ADDRESS || ""
const JPYC_CONTRACT_ADDRESS = process.env.JPYC_CONTRACT_ADDRESS || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const account = privateKeyToAccount(PRIVATE_KEY)

const walletClient = createWalletClient({
  account,
  chain: jocTestnet,
  transport: http(),
})

const publicClient = createPublicClient({
  chain: jocTestnet,
  transport: http(),
})

async function main() {
  const { abi: japanPayShopAbi } = hre.artifacts.readArtifactSync("JapanPayShop")
  const { abi: jpycAbi } = hre.artifacts.readArtifactSync("JPYC")

  const japanPayShop = getContract({
    address: JAPAN_PAY_SHOP_CONTRACT_ADDRESS,
    abi: japanPayShopAbi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  await japanPayShop.write.registerToken([
    JPYC_CONTRACT_ADDRESS,
  ])
}

main().then(console.log)
