

type DropdownProps = {
    children: React.ReactElement | React.ReactElement[],
    isOpen: boolean
}


const Dropdown = ({ children, isOpen }: DropdownProps) => {
    return (
        <div className={`absolute ${isOpen ? 'block' : 'hidden'} right-0 top-[60px] min-w-[120px] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.2)] rounded-md p-3 after:content-[''] after:absolute after:right-0 after:-top-1 after:w-24 after:h-[8px] after:bg-white`}>
            {children}
        </div>
    )
}

export default Dropdown