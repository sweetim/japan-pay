import {
  FC,
  ReactElement,
} from "react"
import { twMerge } from "tailwind-merge"

type ItemContainerProps = {
  className?: string
  children: ReactElement | ReactElement[]
}

const ItemContainer: FC<ItemContainerProps> = ({ className, children }) => {
  return (
    <div className={twMerge("p-2 bg-white rounded-xl", className)}>
      {children}
    </div>
  )
}

export default ItemContainer
