

interface InputProps {
    type: "button" | "email" | "password" | "submit" | "text" | undefined,
    placeholder: string | undefined,
    value: string | undefined,
    onBlur?: () => void,
    onChange?: () => void,
    onClick?: () => void,
    onFocus?: () => void
}


const Input = ({ type, placeholder, value, onBlur, onChange, onClick, onFocus }: InputProps) => {
    return (
        <input 
            className="border rounded w-full px-3 py-2 focus:outline-none focus:shadow-md"
            role="input"
            type={type} 
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onClick={onClick}
            onFocus={onFocus}
        />
    )
}

export default Input