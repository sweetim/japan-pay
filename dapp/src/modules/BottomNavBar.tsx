import {
  House,
  List,
  SquaresFour,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react"
import { FC } from "react"
import { Link } from "react-router-dom"

const BottomNavBar: FC = () => {
  return (
    <div className="w-full h-16 bg-[#595651]">
      <div className="grid h-full max-w-lg grid-cols-5 font-medium border-none">
        <Link
          to="/app"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#e0d9cc] group"
        >
          <House size={32} color="#ffebeb" weight="fill" className="group-hover:fill-[#595651]" />
          <span className="text-sm text-[#e0d9cc] group-hover:text-[#595651]">
            Home
          </span>
        </Link>

        <Link
          to="/app/history"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#e0d9cc] group"
        >
          <List size={28} color="#e0d9cc" weight="fill" className="group-hover:fill-[#595651]" />
          <span className="text-sm text-[#e0d9cc] group-hover:text-[#595651]">
            History
          </span>
        </Link>
        <Link
          to="/app/account"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#e0d9cc] group"
        >
          <SquaresFour size={28} color="#e0d9cc" weight="fill" className="group-hover:fill-[#595651]" />
          <span className="text-sm text-[#e0d9cc] group-hover:text-[#595651]">
            Services
          </span>
        </Link>
        <Link
          to="/app/wallet"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#e0d9cc] group"
        >
          <Wallet size={28} color="#e0d9cc" weight="fill" className="group-hover:fill-[#595651]" />
          <span className="text-sm text-[#e0d9cc] group-hover:text-[#595651]">
            Wallet
          </span>
        </Link>
        <Link
          to="/app/account"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#e0d9cc] group"
        >
          <UserCircleGear size={28} color="#e0d9cc" weight="fill" className="group-hover:fill-[#595651]" />
          <span className="text-sm text-[#e0d9cc] group-hover:text-[#595651]">
            Account
          </span>
        </Link>
      </div>
    </div>
  )
}

export default BottomNavBar
