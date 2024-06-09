import "dotenv/config"

import "@nomicfoundation/hardhat-toolbox-viem"
import type { HardhatUserConfig } from "hardhat/config"

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    joct: {
      url: "https://rpc-1.testnet.japanopenchain.org:8545",
      chainId: 10081,
      accounts: [ PRIVATE_KEY ],
    },
  },
}

export default config
