import BottomNavBar from "@/modules/BottomNavBar"
import { Outlet } from "react-router-dom"

export default function AppRoot() {
  return (
    <div className="h-full w-full bg-[#e2d9ca] p-2">
      <Outlet />
      <BottomNavBar />
    </div>
  )
}
