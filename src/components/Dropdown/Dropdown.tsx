

type DropdownProps = {
    children: React.ReactElement | React.ReactElement[],
    isOpen: boolean
}


const Dropdown = ({ children, isOpen }: DropdownProps) => {
    return (
        <div className={`absolute ${isOpen ? 'block' : 'hidden'} right-0 min-w-[120px] bg-white shadow-[0_0_3px_0_rgba(0,0,0,0.2)] rounded-tl-md rounded-bl-md rounded-br-md p-3`}>
            {children}
        </div>
    )
}

export default Dropdown