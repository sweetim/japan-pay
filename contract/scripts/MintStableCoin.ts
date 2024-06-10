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

const MINT_TO_ADDRESS = "0xeC1C571c8B817f9BC91C2cD55F4898f304EbdB5b"
const JPYC_CONTRACT_ADDRESS = process.env.JPYC_CONTRACT_ADDRESS || ""
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
  const { abi: jpycAbi } = hre.artifacts.readArtifactSync("JPYC")

  const JPYC = getContract({
    address: JPYC_CONTRACT_ADDRESS,
    abi: jpycAbi,
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

  // const tx_usdt = await USDT.write.mint([
  //   MINT_TO_ADDRESS,
  //   BigInt(1_000),
  // ])

  // await publicClient.waitForTransactionReceipt({
  //   hash: tx_usdt,
  // })

  const tx_jpyc = await JPYC.write.mint([
    MINT_TO_ADDRESS,
    BigInt(300_000),
  ])

  await publicClient.waitForTransactionReceipt({
    hash: tx_jpyc,
  })

  console.log("Minting completed")
  console.table({
    JPYC: await JPYC.read.balanceOf([ MINT_TO_ADDRESS ]),
    USDT: await USDT.read.balanceOf([ MINT_TO_ADDRESS ]),
  })
}

main().then(console.log)
