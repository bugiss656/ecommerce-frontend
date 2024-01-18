import { UseFormRegister } from "react-hook-form"


export interface InputErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    message: string | undefined
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string,
    label: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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