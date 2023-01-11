

type MenuProps = {
    children: React.ReactElement | React.ReactElement[]
}


const Menu = ({ children }: MenuProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default Menu