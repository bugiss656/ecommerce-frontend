

type FlexProps = {
    children: React.ReactElement | React.ReactElement[],
    className: string,
    testid?: string
}


const Flex = ({ children, className, testid }: FlexProps) => {
    return (
        <div className={className} data-testid={testid}>
            {children}
        </div>
    )
}

export default Flex