import type { VercelRequest } from "@vercel/node"
import {
  createPublicClient,
  createWalletClient,
  defineChain,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"

const jpycAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [ { name: "approver", internalType: "address", type: "address" } ],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [ { name: "receiver", internalType: "address", type: "address" } ],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [ { name: "sender", internalType: "address", type: "address" } ],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [ { name: "spender", internalType: "address", type: "address" } ],
    name: "ERC20InvalidSpender",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [ { name: "", internalType: "uint256", type: "uint256" } ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [ { name: "", internalType: "bool", type: "bool" } ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [ { name: "account", internalType: "address", type: "address" } ],
    name: "balanceOf",
    outputs: [ { name: "", internalType: "uint256", type: "uint256" } ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [ { name: "", internalType: "uint8", type: "uint8" } ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [ { name: "", internalType: "bool", type: "bool" } ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [ { name: "", internalType: "string", type: "string" } ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [ { name: "", internalType: "string", type: "string" } ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [ { name: "", internalType: "uint256", type: "uint256" } ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [ { name: "", internalType: "bool", type: "bool" } ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [ { name: "", internalType: "bool", type: "bool" } ],
    stateMutability: "nonpayable",
  },
] as const

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

  const tx_transaction = await walletClient.sendTransaction({
    account,
    to: address,
    value: BigInt(0.1 * Math.pow(10, 18)),
  })

  await publicClient.waitForTransactionReceipt({
    hash: tx_transaction,
  })

  return new Response("OK")
}
