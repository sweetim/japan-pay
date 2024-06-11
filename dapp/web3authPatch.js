import { readFileSync, writeFileSync } from "fs"

const FILE_PATH = "./node_modules/@web3auth/ethereum-provider/dist/ethereumProvider.esm.js"
const text = readFileSync(FILE_PATH).toString()
const output = text.replace(/parseInt\(chainId, 16\) !== parseInt\(network, 10\)/g, `parseInt("0x15885970", 16) !== parseInt(network, 10)`)
writeFileSync(FILE_PATH, output)

