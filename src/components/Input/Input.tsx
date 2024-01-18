import { UseFormRegister } from "react-hook-form"


type InputErrorProps = {
    message: string | undefined
}

type LabelProps = {
    htmlFor: string,
    label: string
}

type InputProps = {
    type: "button" | "email" | "password" | "submit" | "text" | "number",
    name: string,
    placeholder?: string,
    register: UseFormRegister<any>,
}

export const InputError = ({ message }: InputErrorProps) => {
    return (
        <span className="text-sm text-red-500">{message}</span>
    )
}

export const Label = ({ htmlFor, label }: LabelProps) => {
    return (
        <label htmlFor={htmlFor}>{label}</label>
    )
}

const Input = ({ 
    type, 
    name, 
    placeholder, 
    register, 
    ...props 
}: InputProps) => {
    return (
        <>
            <input 
                id={name}
                className="border rounded w-full px-3 py-2 focus:outline-none focus:shadow-md"
                type={type}
                role="input"
                placeholder={placeholder}
                {...register(name)}
                {...props}
            />
        </>
    )
}

export default Input