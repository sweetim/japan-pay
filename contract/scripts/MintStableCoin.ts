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

const JPYs_CONTRACT_ADDRESS = process.env.JPYs_CONTRACT_ADDRESS || ""
const USDT_CONTRACT_ADDRESS = process.env.USDT_CONTRACT_ADDRESS || ""

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
  const { abi: usdtAbi } = hre.artifacts.readArtifactSync("USDT")
  const { abi: jpysAbi } = hre.artifacts.readArtifactSync("JPYs")

  const JPYs = getContract({
    address: JPYs_CONTRACT_ADDRESS,
    abi: jpysAbi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  const USDT = getContract({
    address: USDT_CONTRACT_ADDRESS,
    abi: usdtAbi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  await USDT.write.mint([
    account.address,
    BigInt(1_000),
  ])

  await JPYs.write.mint([
    account.address,
    BigInt(100_000),
  ])

  console.log("Minting completed")
  console.table({
    JPYs: await JPYs.read.balanceOf([ account.address ]),
    USDT: await USDT.read.balanceOf([ account.address ]),
  })
}

main().then(console.log)
