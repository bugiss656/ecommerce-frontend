

type SearchBarProps = {
    children: React.ReactNode
}


const SearchBar = ({ children }: SearchBarProps) => {
    return (
        <div className="relative w-96 pl-8">
            {children}
        </div>
    )
}

export default SearchBar