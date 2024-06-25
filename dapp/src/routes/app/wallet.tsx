import { jocTestnet } from "@/chains/joc"
import {
  JPYC_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "@/contract"
import {
  jpycAbi,
  usdtAbi,
} from "@/generated"
import { useTokenBalance } from "@/hooks/useTokenBalance"
import { useWalletAddress } from "@/hooks/useWalletAddress"
import BalanceCard from "@/modules/BalanceCard"
import { ShareFat } from "@phosphor-icons/react"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Button,
  Input,
  List,
  Modal,
  Space,
  Tag,
} from "antd"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import {
  Abi,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"

type WalletRouteState = {
  send: boolean
}

export default function Wallet() {
  const { tokensData, amountJpy, refetchJpyc, refetchUsdt } = useTokenBalance()
  const [ selectedIndex, setSelectedIndex ] = useState(0)
  const [ sendWalletAddress, setSendWalletAddress ] = useState("0x")
  const [ sendAmount, setSendAmount ] = useState(0)
  const { state } = useLocation()
  const { provider } = useWeb3Auth()
  const [ walletAddress ] = useWalletAddress()
  const [ isSending, setIsSending ] = useState(false)

  const [ isSendModalOpen, setIsSendModalOpen ] = useState(false)

  const handleOk = () => {
    setIsSendModalOpen(false)
  }

  const handleCancel = () => {
    setIsSendModalOpen(false)
  }

  const isSend = (state as WalletRouteState)?.send ?? false

  async function sendClickHandler(index: number) {
    setSelectedIndex(index)
    setIsSendModalOpen(true)
  }

  async function sendTokenClickHandler() {
    if (!walletAddress) return
    if (!provider) return

    const privateKey = await provider.request({
      method: "eth_private_key",
    })

    const ERC20_NAME_ABI: Record<string, { abi: Abi; contract: `0x${string}` }> = {
      "USDT": {
        abi: usdtAbi,
        contract: USDT_CONTRACT_ADDRESS,
      },
      "JPYC": {
        abi: jpycAbi,
        contract: JPYC_CONTRACT_ADDRESS,
      },
    }

    const erc20Name = tokensData[selectedIndex].title

    const publicClient = createPublicClient({
      chain: jocTestnet,
      transport: http(),
    })

    const walletClient = createWalletClient({
      account: privateKeyToAccount(`0x${privateKey}` as any),
      chain: jocTestnet,
      transport: custom<IProvider>(provider),
    })

    console.log("start")
    setIsSending(true)
    await publicClient.waitForTransactionReceipt({
      hash: await walletClient.writeContract({
        abi: ERC20_NAME_ABI[erc20Name].abi,
        address: ERC20_NAME_ABI[erc20Name].contract,
        functionName: "transfer",
        args: [
          sendWalletAddress,
          BigInt(sendAmount),
        ],
      }),
    })
    await refetchJpyc()
    await refetchUsdt()
    setIsSending(false)
    console.log("done")
    setIsSendModalOpen(false)
  }

  return (
    <Space direction="vertical" size="large" className="w-full p-2">
      {
        <Modal
          className="p-5"
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          open={isSendModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Space className="w-full py-2 mt-2" direction="vertical" size="middle">
            <Space className="w-full py-2" direction="vertical" align="center">
              <Avatar src={tokensData[selectedIndex].image} />
              <p>
                send <strong>{tokensData[selectedIndex].title}</strong>
              </p>
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <p className="font-bold">Wallet address</p>
              <Input
                className="w-full"
                size="large"
                onChange={ev => setSendWalletAddress(ev.target.value)}
                placeholder="Wallet address"
              />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <p className="font-bold">Amount</p>
              <Input
                className="w-full"
                size="large"
                onChange={ev => setSendAmount(Number(ev.target.value))}
                placeholder={tokensData[selectedIndex].title}
              />
              <p className="font-bold">{`Balance ${tokensData[selectedIndex].amount?.toLocaleString()}`}</p>
            </Space>
            <div className="flex flex-row pt-5 justify-center align-middle">
              {isSending
                ? <p className="font-bold text-xl">sending...</p>
                : <Button className="!px-10" shape="round" size="large" onClick={sendTokenClickHandler}>Send</Button>}
            </div>
          </Space>
        </Modal>
      }
      <div className="w-full p-2">
        <BalanceCard balance={amountJpy} />
      </div>
      <Space direction="vertical" className="w-full">
        <h1>
          <strong>Tokens</strong>
        </h1>
        <List
          itemLayout="horizontal"
          dataSource={tokensData}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={item.title}
                description={item.description ? <Tag color="red">{item.description}</Tag> : ""}
              />
              <Space size="middle">
                <h2 className="text-xl font-bold">{item.amount?.toLocaleString()}</h2>
                {isSend && (
                  <ShareFat
                    onClick={() => sendClickHandler(index)}
                    size={26}
                    color="#eb473d"
                    weight="fill"
                  />
                )}
              </Space>
            </List.Item>
          )}
        />
      </Space>
    </Space>
  )
}
