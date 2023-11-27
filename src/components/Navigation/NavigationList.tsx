

type NavigationListProps = {
    children: React.ReactElement | React.ReactElement[]
}


const NavigationList = ({ children }: NavigationListProps) => {
    return (
        <ul className="flex flex-row pt-[2px]" data-testid='navigation-list'>
            {children}
        </ul>
    )
}

export default NavigationList