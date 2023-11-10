import { Link } from "react-router-dom"


interface ButtonProps {
    className: string,
    href?: string,
    text: string,
    onClick?: () => void
}

const Button = ({ className, text, href, onClick }: ButtonProps) => {
        if (href) {
            return (
                <Link to={href} onClick={onClick}>
                    <button className={className}>{text}</button>
                </Link>
            )
        } else {
            return (
                <button className={className} onClick={onClick}>{text}</button>
            )
        }
}

export default Button