
interface SelectProps {
    children: React.ReactNode,
    name: string,
    id: string,
    className?: string,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

interface OptionProps {
    text: string,
    value?: string
}

export const Select = ({ children, name, id, className, onChange, ...props }: SelectProps) => {
    return (
        <select 
            id={id}
            className={`text-md p-1 border-[1px] border-black rounded-md ${className}`} 
            name={name} 
            onChange={onChange}
            {...props} 
        >
            {children}
        </select>
    )
}

export const Option = ({ text, value, ...props }: OptionProps) => {
    return (
        <option value={value} {...props}>{text}</option>
    )
}