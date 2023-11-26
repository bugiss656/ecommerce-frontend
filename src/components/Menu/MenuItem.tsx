import { useState } from "react"

import Dropdown from "../Dropdown/Dropdown"
import { Link } from "react-router-dom"


type MenuItemProps = {
    link: string
    icon: React.ReactNode
    text: string
    dropdown: boolean
    children?: React.ReactElement | React.ReactElement[]
}

const MenuItem = ({ link, icon, text, dropdown, children }: MenuItemProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => {
                setIsHovered(true)
                setIsOpen(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                setIsOpen(false)
            }}
            data-testid="menu-item"
        >
            <Link
                to={link}
                className={`flex flex-col items-center after:absolute after:z-10 after:right-0 after:-bottom-1 after:w-full after:h-[8px] w-24 px-4 py-3 
                    ${isHovered
                        ? "after:bg-white shadow-[0_0_3px_0_rgba(0,0,0,0.2)] rounded-t-md"
                        : ""
                    }`
                }
                data-testid="menu-item-link"
            >
                {icon}
                <div className="text-[11px]">{text}</div>
            </Link>
            {dropdown && <Dropdown isOpen={isOpen}>{children}</Dropdown>}
        </div>
    )
}

export default MenuItem
