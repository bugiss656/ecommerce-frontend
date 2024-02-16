

export interface ModalWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[]
}

const ModalWrapper = ({ children, onClick }: ModalWrapperProps) => {
    return ( 
        <div onClick={onClick} className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity">
            {children}
        </div>
    )
}

export default ModalWrapper