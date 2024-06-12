import {
  ConfigProvider,
  Space,
  ThemeConfig,
} from "antd"
import {
  Link,
  Outlet,
} from "react-router-dom"

const themeConfig: ThemeConfig = {
  components: {
    Button: {
      defaultBg: "#ff3131",
      defaultColor: "white",
      defaultBorderColor: "#ff3131",
      defaultHoverBg: "#ff3131bb",
      defaultHoverBorderColor: "#ff3131bb",
      defaultHoverColor: "white",
      defaultActiveColor: "white",
      defaultActiveBg: "#ff3131bb",
      defaultActiveBorderColor: "#ff3131bb",
    },
  },
}
export default function Root() {
  return (
    <ConfigProvider
      theme={themeConfig}
    >
      <div className="flex h-screen flex-col bg-[#e2d9ca]">
        <Space>
          <Link to="/">
            <img className="w-12 h-12 p-2" src="/logo.png" alt="logo" />
          </Link>
          <h1 className="font-bold">Japan Pay</h1>
        </Space>
        <Outlet />
      </div>
    </ConfigProvider>
  )
}
