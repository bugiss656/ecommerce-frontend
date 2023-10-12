import { ReactElement } from "react"


type OrderListItemProps = {
    icon: ReactElement
}

type OrderListProps = {
    children: ReactElement | ReactElement[]
}

export const OrderListItem = ({ icon }: OrderListItemProps) => {
    return (
        <a href="" className="flex flex-row shadow-primary hover:shadow-secondary rounded-lg mb-4">
            <div className="w-1/4 p-6 bg-gray-100">
                <h1 className="text-lg font-medium mb-2">Zakończone</h1>
                <p>01 luty 2023</p>
                <p className="font-medium mt-2">199,99 zł</p>
            </div>
            <div className="flex items-center justify-center w-3/4">
                {icon}
                <span>Logitech G305 LIGHTSPEED</span>
            </div>
        </a>
    )
}

export const OrderList = ({ children }: OrderListProps) => {
    return (
        <div className="w-full">
            {children}
        </div>
    )
}