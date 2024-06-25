import { Gift } from "@phosphor-icons/react"
import {
  Carousel,
  ConfigProvider,
  Modal,
  Space,
  theme,
} from "antd"
import {
  FC,
  useEffect,
  useState,
} from "react"
import ItemContainer from "../common/ItemContainer"

type SignUpBonusModalProps = {
  open: boolean
}

const SignUpBonusModal: FC<SignUpBonusModalProps> = ({ open }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  useEffect(() => {
    setIsModalOpen(open)
  }, [ open ])

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      className="p-5"
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Carousel className="!text-black w-full py-5">
          <div className="w-full">
            <Space direction="vertical" className="w-full py-3" align="center">
              <Gift size={128} color="#f00" weight="fill" />
              <h2 className="font-bold text-xl">Congratulation!</h2>
              <p>as a welcome gift for signing up Japan Pay</p>
              <p>you are rewarded with</p>
              <div className="py-3">
                <h1 className="text-4xl">
                  {Number(100_000).toLocaleString()} <span className="text-2xl text-slate-600">JPYC</span>
                </h1>
              </div>
              <p>have a great travel time with us in Japan</p>
              <p>ありがとうございます</p>
            </Space>
          </div>
          <div className="w-full">
            <Space direction="vertical" className="w-full py-5" align="center">
              <img className="w-20 h-20 p-2" src="/logo.png" alt="logo" />
              <h2 className="font-bold text-xl pb-2">Japan Pay</h2>
              <Space direction="vertical" className="w-full" size="middle">
                <ItemContainer className="bg-[#e0d9cc] w-full">
                  <p className="p-2">enjoy the best tax free shopping exprience</p>
                </ItemContainer>
                <ItemContainer className="bg-[#e0d9cc] w-full">
                  <p className="p-2">enjoy greatest discout with us</p>
                </ItemContainer>
                <ItemContainer className="bg-[#e0d9cc] w-full">
                  <p className="p-2">convenient scan and pay</p>
                </ItemContainer>
              </Space>
            </Space>
          </div>
        </Carousel>
      </ConfigProvider>
    </Modal>
  )
}

export default SignUpBonusModal
