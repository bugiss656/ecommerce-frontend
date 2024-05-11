import { IoIosClose } from "react-icons/io"


interface ActiveFilterItemProps {
    text: string,
    onClick: () => void
}

const ActiveFilterItem = ({ text, onClick }: ActiveFilterItemProps) => {
    return (
        <div
            className="flex flex-row items-center mx-2 p-1 border-[1px] border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <div className="">{text}</div>
            <IoIosClose className="text-2xl" />
        </div>
    )
}

export default ActiveFilterItem