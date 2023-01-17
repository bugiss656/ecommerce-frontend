

type NavigationListProps = {
    children: React.ReactElement | React.ReactElement[]
}


const NavigationList = ({ children }: NavigationListProps) => {
    return (
        <ul className="flex flex-row pt-[2px]">
            {children}
        </ul>
    )
}

export default NavigationList