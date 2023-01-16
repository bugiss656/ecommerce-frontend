

type MenuProps = {
    children: React.ReactElement | React.ReactElement[]
}


const Menu = ({ children }: MenuProps) => {
    return (
        <div className="flex flex-row items-center">
            {children}
        </div>
    )
}

export default Menu