import { Link } from "react-router-dom"


type CategoryCardProps = {
    href: string,
    image?: string,
    alt: string,
    title: string,
    width: number,
    height: number | string
}

const CategoryCard = ({ href, image, alt, title, width, height }: CategoryCardProps) => {
    return (
        <Link to={href} className="flex flex-col items-center rounded-md p-6 m-3 hover:shadow-primary hover:cursor-pointer">
            <img src={image} alt={alt} width={width} height={height} />
            <h1 className="text-xl font-medium mt-5">{title}</h1>
        </Link>
    )
}

export default CategoryCard