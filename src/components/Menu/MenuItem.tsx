import { useState } from 'react'

import Dropdown from '../Dropdown/Dropdown'
import { Link } from "react-router-dom"


type MenuItemProps = {
    link: string,
    icon: React.ReactNode,
    text: string,
    dropdown: boolean,
}


const MenuItem = ({ link, icon, text, dropdown }: MenuItemProps) => { 
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
      >
        <Link
          to={link}
          className={`flex flex-col items-center w-24 px-4 py-3 ${isHovered ? 'shadow-[0_-1px_3px_0_rgba(0,0,0,0.2)] rounded-t-md' : ''}`}
        > 
            {icon}
            <div className="text-[11px]">{text}</div>
        </Link>
        {dropdown 
            ?
                <Dropdown 
                  isOpen={isOpen}
                >
                    <ul>
                        <li>One</li>
                        <li>Two</li>
                        <li>Three</li>
                    </ul>
                </Dropdown>
            :
                null
        }
      </div>
    )
}

export default MenuItem