import { Link } from "react-router-dom"


type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface ButtonProps {
    className: string,
    type?: ButtonType,
    href?: string,
    text: string,
    onClick?: () => void
}

const Button = ({ className, type, text, href, onClick, ...props }: ButtonProps) => {
        if (href) {
            return (
                <Link to={href} onClick={onClick}>
                    <button className={className} type={type} {...props}>{text}</button>
                </Link>
            )
        } else {
            return (
                <button className={className} type={type} onClick={onClick} {...props}>{text}</button>
            )
        }
}

export default Button