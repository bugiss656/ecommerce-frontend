import { Link } from "react-router-dom"


type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface ButtonProps {
    className: string,
    type?: ButtonType,
    href?: string,
    text: string,
    onClick?: () => void
}

const Button = ({ className, type, text, href, onClick }: ButtonProps) => {
        if (href) {
            return (
                <Link to={href} onClick={onClick}>
                    <button className={className} type={type}>{text}</button>
                </Link>
            )
        } else {
            return (
                <button className={className} type={type} onClick={onClick}>{text}</button>
            )
        }
}

export default Button