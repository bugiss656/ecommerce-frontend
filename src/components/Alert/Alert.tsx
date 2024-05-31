import { IoMdClose } from "react-icons/io"


interface AlertProps {
    type: 'success' | 'warning' | 'danger',
    message: string,
    onClick: () => void
}

const Alert = ({ type, message, onClick }: AlertProps) => {
    let alertColor = ''

    switch (type) {
        case 'success':
            alertColor = 'bg-green-200'
            break
        case 'warning':
            alertColor = 'bg-yellow-200'
            break
        case 'danger':
            alertColor = 'bg-red-200'
            break
    }

    return (
        <div className={`rounded-md my-3 p-3 ${alertColor}`} role="alert">
            <div className="flex flex-row justify-between items-center">
                <div className="mx-3">{message}</div>
                <IoMdClose 
                    data-testid='close-icon'
                    className="text-2xl hover:cursor-pointer" 
                    onClick={onClick} 
                />
            </div>
        </div>
    )
}

export default Alert