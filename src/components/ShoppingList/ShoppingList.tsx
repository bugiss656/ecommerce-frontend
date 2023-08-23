import { ReactElement } from "react"
import { IconContext } from "react-icons"

import { BsCardImage } from 'react-icons/bs'


type ShoppingListItemProps = {
    icon?: ReactElement
}

type ShoppingListProps = {
    children: ReactElement | ReactElement[]
}

export const ShoppingListItem = ({  }: ShoppingListItemProps) => {
    return (
        <a href="" className="flex flex-col px-6 py-4 shadow-md rounded-lg mb-4">
            <div className="">
                <h1 className="text-lg font-medium">Akcesoria</h1>
                <p>01 luty 2023 (ostatnia zmiana)</p>
            </div>
            <div className="flex items-center justify-center">
                <IconContext.Provider
                    value={{
                        style: {
                            fontSize: '45px',
                        }
                    }}
                >
                    <div className="mx-4">
                        <BsCardImage />
                    </div>
                    <div className="mx-4">
                        <BsCardImage />
                    </div>
                    <div className="mx-4">
                        <BsCardImage />
                    </div>
                </IconContext.Provider>
            </div>
            <div className="">
                <p>199,00 zł</p>
            </div>
        </a>
    )
}

export const ShoppingList = ({ children }: ShoppingListProps) => {
    return (
        <>
            <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-2xl">Listy zakupowe</h1>
                <a href="" className="px-3 py-1 rounded hover:bg-slate-100">Zobacz więcej</a>
            </div>
            <div>
                {children}
            </div>
        </>
    )
}