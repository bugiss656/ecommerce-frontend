

type NavigationProps = {
    children: React.ReactElement | React.ReactElement[]
}


const Navigation = ({ children }: NavigationProps) => {
    return (
        <nav className="bg-slate-50" data-testid="navigation">
            {children}
        </nav>
    )
}

export default Navigation