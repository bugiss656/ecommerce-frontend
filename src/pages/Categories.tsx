import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect } from "react"
import { convertSlugToString } from "../utils/functions"
import { 
    fetchSubcategories,  
    selectSubcategories, 
    selectSubcategoriesError, 
    selectSubcategoriesStatus
} from "../features/categories/categoriesSlice"
import { Status } from "../features/types"
import CategoryCard from "../components/CategoryCard/CategoryCard"


const Categories = () => {
    const { category } = useParams()
    const dispatch = useAppDispatch()

    const subcategoriesStatus = useAppSelector(selectSubcategoriesStatus)
    const subcategoriesError = useAppSelector(selectSubcategoriesError)
    const subcategories = useAppSelector(selectSubcategories)

    useEffect(() => {
        dispatch(fetchSubcategories({ category: category }))
    }, [dispatch, category])

    return (
        <div className="my-6">
            <h1 className="text-3xl ">Kategorie</h1>
            <h1 className="text-xl">w {convertSlugToString(category)}</h1>
            <div className="flex flex-row flex-wrap justify-center my-6">
                {subcategoriesStatus === Status.LOADING && <span>Loading...</span>}
                {subcategoriesError === Status.FAILED && <span>Error occured...</span>}
                {subcategories &&
                    subcategories.map((subcategory) => 
                        <CategoryCard
                            href={`/produkty-w-kategoriach/${subcategory.slug}`}
                            imageSrc={subcategory.image}
                            alt={subcategory.name}
                            title={subcategory.name}
                            width={140}
                            height="auto"
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Categories