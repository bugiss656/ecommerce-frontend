import { Link } from "react-router-dom"


interface CategoryCardProps {
    href: string,
    imageSrc: string,
    alt: string,
    title: string,
    width: number,
    height: number | string
}

const CategoryCard = ({ href, imageSrc, alt, title, width, height, ...props }: CategoryCardProps) => {
    return (
        <Link
            to={href}
            className="flex flex-col items-center rounded-md p-6 m-3 hover:shadow-primary hover:cursor-pointer"
            {...props}
        >
            <img src={imageSrc} alt={alt} width={width} height={height} />
            <h1 className="text-xl font-medium mt-5">{title}</h1>
        </Link>
    )
}

export default CategoryCard