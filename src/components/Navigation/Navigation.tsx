

type NavigationProps = {
    children: React.ReactElement | React.ReactElement[]
}


const Navigation = ({ children }: NavigationProps) => {
    return (
        <nav className="bg-slate-50">
            {children}
        </nav>
    )
}

export default Navigation