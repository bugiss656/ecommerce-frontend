import { ReactElement } from "react"


type OrderListItemProps = {
    icon: ReactElement
}

type OrderListProps = {
    children: ReactElement | ReactElement[]
}

export const OrderListItem = ({ icon }: OrderListItemProps) => {
    return (
        <a href="" className="flex flex-row shadow-md rounded-lg mb-4">
            <div className="w-1/4 p-6 bg-gray-100">
                <h1 className="text-lg font-medium">Zakończone</h1>
                <p>01 luty 2023</p>
                <p>199,99 zł</p>
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
        <>
            <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-2xl">Zamówienia</h1>
                <a href="" className="px-3 py-1 rounded hover:bg-slate-100">Zobacz więcej</a>
            </div>
            <div className="w-full">
                {children}
            </div>
        </>
    )
}