import { convertSlugToString } from "../../utils/functions"

import { IoIosClose } from "react-icons/io"


interface ActiveFilterItemProps {
    text: string,
    onClick: () => void
}

interface ActiveFilterProps {
    name: string,
    children: React.ReactElement | React.ReactElement[]
}

export const ActiveFilterItem = ({ text, onClick }: ActiveFilterItemProps) => {
    return (
        <div
            className="flex flex-row items-center mx-2 p-1 border-[1px] border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <div className="text-sm">{text}</div>
            <IoIosClose data-testid="close-icon" className="text-2xl" />
        </div>
    )
}

export const ActiveFilter = ({ name, children }: ActiveFilterProps) => {
    return (
        <div className="flex flex-row justify-center items-center">
            <div className="text-md">{convertSlugToString(name)}:&nbsp;</div>
            {children}
        </div>
    )
}