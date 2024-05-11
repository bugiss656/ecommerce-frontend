import { convertSlugToString } from "../../utils/functions"


interface ActiveFilterProps {
    name: string,
    children: React.ReactElement | React.ReactElement[]
}

const ActiveFilter = ({ name, children }: ActiveFilterProps) => {
    return (
        <div className="flex flex-row justify-center items-center">
            <div className="">{convertSlugToString(name)}:&nbsp;</div>
            {children}
        </div>
    )
}

export default ActiveFilter