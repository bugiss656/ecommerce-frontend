import { UseFormRegister } from "react-hook-form"


type InputErrorProps = {
    message: string | undefined
}

type InputProps = {
    type: "button" | "email" | "password" | "submit" | "text" | "number",
    name: string,
    label?: string,
    placeholder?: string,
    errors: any,
    register: UseFormRegister<any>
}

export const InputError = ({ message }: InputErrorProps) => {
    return (
        <span className="text-sm text-red-500">{message}</span>
    )
}

const Input = ({ 
    type, 
    name, 
    label, 
    placeholder, 
    register, 
    errors, 
    ...props 
}: InputProps) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input 
                id={name}
                className="border rounded w-full px-3 py-2 focus:outline-none focus:shadow-md"
                type={type}
                role="input"
                placeholder={placeholder}
                {...register(name)}
                {...props}
            />
            {errors[name] ? <InputError message={errors[name].message} />  : null}
        </>
    )
}

export default Input