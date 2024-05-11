import { Link } from "react-router-dom"


type ProductCardProps = {
    image: string,
    title: string,
    href: string,
    availability: number,
    price: number
}

const ProductCard = ({ image, title, href, availability, price }: ProductCardProps) => {
    return (
        <Link to={href} className="flex flex-col items-center p-3 m-3 hover:shadow-secondary hover:rounded-md">
            <div className="mb-5">
                <img src={image} alt={title} />
            </div>
            <div className="items-left">
                <h1 className="text-lg mb-2">{title}</h1>
                {availability > 0 ? 
                    <p className="text-green-600">Dostępny w magazynie</p> : 
                    <p className="text-red-600">Produkt niedostępny</p>}
                <p className="text-xl font-medium mt-3">{price} zł</p>
            </div>
        </Link>
    )
}

export default ProductCard