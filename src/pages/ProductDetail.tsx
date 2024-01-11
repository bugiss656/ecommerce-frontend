import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { 
    clearProductState,
    fetchProductDetail, 
    selectSingleProduct, 
    selectSingleProductError, 
    selectSingleProductStatus 
} from "../features/products/productDetailSlice"

import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import ImageGallery from "../components/ImageGallery/ImageGallery"
import { Status } from "../features/types"


const ProductDetail = () => {
    const { slug } = useParams()
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState<number>(1)

    const productStatus = useAppSelector(selectSingleProductStatus)
    const productError = useAppSelector(selectSingleProductError)
    const product = useAppSelector(selectSingleProduct)

    useEffect(() => {
        dispatch(clearProductState())
        dispatch(fetchProductDetail({ slug: slug }))
    }, [dispatch, slug])

    if (productStatus === Status.LOADING) {
        return <div>Loading ...</div>
    }

    if (productError) {
        return <h1>{productError}</h1>
    }

    return (
        <div className="flex flex-col my-6">
            {product &&
                <div className="flex flex-row justify-around">
                    <div className="flex flex-col w-2/3">
                        <div className="mb-5">
                            <h1 className="text-4xl">{product.name}</h1>
                            <div className="">{product.supplier.name}</div>
                        </div>
                        <ImageGallery images={product.images && product.images} />
                        <div className="my-10">
                            <div 
                                dangerouslySetInnerHTML={{ __html: product.description }} 
                                className="text-justify"
                            ></div>
                        </div>
                    </div>
                    <div className="sticky top-0 flex flex-col h-full">
                        <div className="text-4xl">{product.price} zł</div>
                        {product.stock_quantity > 0 ?
                            <p className="text-green-600 mt-1">Dostępny w magazynie</p> :
                            <p className="text-red-600 mt-1">Produkt niedostępny</p>
                        }
                        <form>
                            <div className="mt-3">
                                <Input
                                    type="number"
                                    disabled={product.stock_quantity <= 0 && true}
                                    value={quantity}
                                    min="1"
                                    max="99"
                                    onChange={(e: any) => setQuantity(e.target.value)}
                                />
                            </div>
                            <Button
                                className="rounded-full text-white w-full py-3 mt-5 bg-green-500 hover:bg-green-600"
                                type="submit"
                                text="Do koszyka"
                            />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetail