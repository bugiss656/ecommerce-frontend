

type DropdownProps = {
    children?: React.ReactElement | React.ReactElement[],
    isOpen: boolean
}


const Dropdown = ({ children, isOpen }: DropdownProps) => {
    return (
        <div className={`absolute ${isOpen ? 'block' : 'hidden'} w-auto min-w-[120px] right-0 bg-white shadow-[0_0_3px_0_rgba(0,0,0,0.2)] rounded-tl-md rounded-bl-md rounded-br-md whitespace-nowrap`} data-testid="dropdown">
            {isOpen ? children : null}
        </div>
    )
}

export default Dropdown