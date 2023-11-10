import { IconContext } from "react-icons"
import { ReactElement } from "react"
import { Link } from "react-router-dom"


type AccountMenuItemProps = {
    icon: ReactElement,
    text: string,
    href: string,
    className: string
}

type AccountMenuProps = {
    children: ReactElement[]
}

export const AccountMenuItem = ({ icon, text, href, className }: AccountMenuItemProps) => {
    return (
        <Link to={href} className={className}>
            {icon}
            <span>{text}</span>
        </Link>
    )
}

export const AccountMenu = ({ children }: AccountMenuProps) => {
    return (
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
    )
}