import { defineChain } from "viem"

export const WEB3_AUTH_CLIENT_ID =
  "BNJRSXS1UtdwjQ_Ox5dwgdUQe3G9QbHp2oNfVR_6E8dsZePqGzumiY8R9UKsENq5D_Psuh6Fr0jJdNMQlqxJ_Uk"

export const JOC_CHAIN = defineChain({
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
