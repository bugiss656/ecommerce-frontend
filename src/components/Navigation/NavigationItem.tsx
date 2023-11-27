import { useState } from 'react'

import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'


type NavigationItemProps = {
    icon?: React.ReactElement,
    href: string,
    text: string,
    dropdown?: boolean,
    children?: React.ReactElement | React.ReactElement[]
}


const NavigationItem = ({ icon, href, text, dropdown, children }: NavigationItemProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <li
            className="relative"
            onMouseEnter={() => {
                setIsHovered(true)
                setIsOpen(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                setIsOpen(false)
            }}
            data-testid="navigation-item"
        >
            <Link to={href} className={`flex flex-col items-center p-4 after:absolute after:z-10 after:right-0 after:-bottom-1 after:w-full after:h-[8px] ${isHovered ? 'bg-white after:bg-white shadow-[0_0_3px_0_rgba(0,0,0,0.2)] rounded-t-md' : ''}`}>
                {icon}
                <div className="text-base">{text}</div>
            </Link>
            {dropdown && <Dropdown isOpen={isOpen}>{children}</Dropdown>
            }
        </li>
    )
}

export default NavigationItem