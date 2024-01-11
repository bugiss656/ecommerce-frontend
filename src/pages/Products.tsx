import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
    selectProductsStatus,
    selectProductsError,
    selectProducts,
    fetchProducts
} from "../features/products/productsSlice"
import { useEffect } from "react"
import { convertStringToSlug, convertSlugToString } from "../utils/functions"
import ProductCard from "../components/ProductCard/ProductCard"

const Products = () => {
    const { category } = useParams()
    const dispatch = useAppDispatch()

    const productsStatus = useAppSelector(selectProductsStatus)
    const productsError = useAppSelector(selectProductsError)
    const products = useAppSelector(selectProducts)

    useEffect(() => {
        dispatch(fetchProducts({ category: category }))
    }, [dispatch, category])

    return (
        <div className="my-6">
            <h1 className="text-3xl">{convertSlugToString(category)}</h1>
            <div className="flex flex-row flex-wrap justify-center">
                {products &&
                    products.map((product) =>
                        <ProductCard
                            image={product.main_image}
                            title={product.name}
                            href={`/produkty/${convertStringToSlug(product.name)}`}
                            availability={product.stock_quantity} 
                            price={product.price}
                        />
                    )
                    
                }
            </div>
        </div>
    )
}

export default Products