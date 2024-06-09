import { Space } from "antd"
import {
  Link,
  Outlet,
} from "react-router-dom"

export default function Root() {
  return (
    <div className="h-screen w-screen bg-[#e2d9ca] p-2">
      <Space>
        <Link to="/">
          <img className="w-12 h-12" src="/logo.png" alt="logo" />
        </Link>
        <h1 className="font-bold">Japan Pay</h1>
      </Space>
      <Outlet />
    </div>
  )
}
