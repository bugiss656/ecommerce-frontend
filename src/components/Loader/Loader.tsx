
interface LoaderProps {
    width?: string,
    height?: string
}


const Loader = ({ width='30px', height='30px' }: LoaderProps) => {
    return (
        <div 
            className="border-[2px] border-gray-100 border-t-black rounded-[50%] animate-spin"
            style={{ width: width, height: height }}
        ></div>
    )
}

export default Loader