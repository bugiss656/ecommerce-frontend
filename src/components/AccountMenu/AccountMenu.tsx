import { IconContext } from "react-icons"
import { ReactElement } from "react"


type AccountMenuItemProps = {
    icon: ReactElement,
    text: string
}

type AccountMenuProps = {
    children: ReactElement[]
}

export const AccountMenuItem = ({ icon, text }: AccountMenuItemProps) => {
    return (
        <a className="flex flex-row items-center px-3 py-4 hover:cursor-pointer hover:bg-slate-100">
            {icon}
            <span>{text}</span>
        </a>
    )
}

export const AccountMenu = ({ children }: AccountMenuProps) => {
    return (
        <div className="w-1/5 mr-8">
            <div className="mb-3">
                <p className="mb-1">Witaj,</p>
                <p className="text-xl font-medium">John Doe</p>
            </div>
            <div className="flex flex-col">
                <IconContext.Provider
                    value={{
                        style: {
                            fontSize: "24px",
                            marginRight: "8px",
                        },
                    }}
                >
                    {children}
                </IconContext.Provider>
            </div>
        </div>
    )
}