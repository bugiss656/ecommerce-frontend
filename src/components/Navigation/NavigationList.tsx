

type NavigationListProps = {
    children: React.ReactNode | React.ReactNode[] | null
}


const NavigationList = ({ children }: NavigationListProps) => {
    return (
        <ul className="flex flex-row pt-[2px]" data-testid='navigation-list'>
            {children}
        </ul>
    )
}

export default NavigationList