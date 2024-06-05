

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[]
}

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[]
}

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[]
}

export const ModalHeader = ({ children }: ModalHeaderProps) => {
    return (
        <div className="flex justify-between items-center rounded-t-lg w-full px-4 py-3 bg-gray-200">
            {children}
        </div>
    )
}

export const ModalBody = ({ children }: ModalBodyProps) => {
    return (
        <div className="flex justify-center w-full px-4 py-3">
            {children}
        </div>
    )
}

export const Modal = ({ children }: ModalProps) => {
    return (
        <div data-testid="modal" className="modal flex flex-col items-center rounded-lg z-[999] w-[400px] h-auto max-w-[400px] bg-white">
            {children}
        </div>
    )
}