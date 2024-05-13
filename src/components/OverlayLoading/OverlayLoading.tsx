
interface OverlayLoadingProps {
    children?: React.ReactElement | React.ReactElement[]
}


const OverlayLoading = ({ children }: OverlayLoadingProps) => {
    return (
        <div className="z-10 flex justify-center items-center absolute top-0 w-full h-full bg-white opacity-50">
            {children}
        </div>
    )
}

export default OverlayLoading