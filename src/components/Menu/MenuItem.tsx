import { IconContext } from "react-icons"

import { Link } from "react-router-dom"
import Flex from "../Flex/Flex"


type MenuItemProps = {
    link: string,
    icon: React.ReactElement,
    text: string
}


const MenuItem = ({ link, icon, text }: MenuItemProps) => {
    return (
        <Link to={link} className="h-[66px] hover:shadow-md hover:rounded">
            <Flex className="flex flex-col items-center px-4 py-4">
                <IconContext.Provider value={{ style: { width: '22px', height: 'auto', paddingBottom: '2px' } }}>
                    {icon}
                </IconContext.Provider> 
                <div className="text-sm">{text}</div>
            </Flex>
        </Link>
    )
}

export default MenuItem