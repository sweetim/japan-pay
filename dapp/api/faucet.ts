import type { VercelRequest } from "@vercel/node"
import {
  createPublicClient,
  createWalletClient,
  defineChain,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { jpycAbi } from "../src/generated"

const jocTestnet = defineChain({
  id: 0x2761,
  name: "Japan Open Chain Testnet",
  nativeCurrency: {
    name: "Japan Open Chain Testnet",
    symbol: "JOCT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc-1.testnet.japanopenchain.org:8545",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "explorer",
      url: "https://explorer.testnet.japanopenchain.org/",
    },
  },
  testnet: true,
})

const {
  PRIVATE_KEY,
  JPYC_CONTRACT_ADDRESS,
} = process.env

type FaucetPayload = {
  address: `0x${string}`
}

export function GET(request: VercelRequest) {
  return new Response(`Hello ${Date.now()}`)
}

export async function POST(request: Request) {
  const data: FaucetPayload = await request.json()
  const { address } = data

  const account = privateKeyToAccount(PRIVATE_KEY as any)

  const publicClient = createPublicClient({
    chain: jocTestnet,
    transport: http(),
  })

  const walletClient = createWalletClient({
    account,
    chain: jocTestnet,
    transport: http(),
  })

  const JPYC = getContract({
    address: JPYC_CONTRACT_ADDRESS as any,
    abi: jpycAbi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  const tx_jpyc = await JPYC.write.mint([
    address,
    BigInt(100_000),
  ])

  await publicClient.waitForTransactionReceipt({
    hash: tx_jpyc,
  })

  return new Response("OK")
}
