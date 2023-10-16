import { IconContext } from "react-icons"
import { ReactElement } from "react"
import { Link } from "react-router-dom"


type AccountMenuItemProps = {
    icon: ReactElement,
    text: string,
    href: string
}

type AccountMenuProps = {
    children: ReactElement[]
}

export const AccountMenuItem = ({ icon, text, href }: AccountMenuItemProps) => {
    return (
        <Link to={href} className="flex flex-row items-center px-3 py-4 hover:cursor-pointer hover:bg-slate-100">
            {icon}
            <span>{text}</span>
        </Link>
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