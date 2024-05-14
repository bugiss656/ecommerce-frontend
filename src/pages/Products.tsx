import { 
    useState, 
    useEffect, 
    Fragment 
} from "react"
import { 
    useLocation, 
    useParams, 
    useSearchParams 
} from "react-router-dom"
import { 
    useAppDispatch, 
    useAppSelector 
} from "../app/hooks"
import {
    selectProductsStatus,
    selectProductsError,
    selectProducts,
    fetchProducts
} from "../features/products/productsSlice"
import { 
    fetchSuppliers, 
    selectSuppliers, 
    selectSuppliersError, 
    selectSuppliersStatus 
} from "../features/products/suppliersSlice"
import { 
    fetchAttributes, 
    selectAttributes, 
    selectAttributesError, 
    selectAttributesStatus 
} from "../features/products/attributesSlice"
import { 
    convertStringToSlug, 
    convertSlugToString
} from "../utils/functions"

import ProductCard from "../components/ProductCard/ProductCard"
import { CiFilter } from "react-icons/ci"
import Input, { Label } from "../components/Input/Input"
import { Status } from "../features/types"
import ActiveFilter from "../components/ActiveFilters/ActiveFilter"
import ActiveFilterItem from "../components/ActiveFilters/ActiveFilterItem"
import Loader from "../components/Loader/Loader"
import OverlayLoading from "../components/OverlayLoading/OverlayLoading"


const Products = () => {
    const location = useLocation()
    const { category } = useParams()
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const [activeFilters, setActiveFilters] = useState<any>({})

    const suppliersStatus = useAppSelector(selectSuppliersStatus)
    const suppliersError = useAppSelector(selectSuppliersError)
    const suppliers = useAppSelector(selectSuppliers)

    const attributesStatus = useAppSelector(selectAttributesStatus)
    const attributeError = useAppSelector(selectAttributesError)
    const attributes = useAppSelector(selectAttributes)

    const productsStatus = useAppSelector(selectProductsStatus)
    const productsError = useAppSelector(selectProductsError)
    const products = useAppSelector(selectProducts)
    

    const addSearchParamOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type, value, dataset } = event.target
        const param = dataset.filterName as string

        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            if (type === 'checkbox') {
                newParams.append(param, value)
            } else if (type=== 'text' || 'number') {
                if (newParams.get(param) !== value) {
                    newParams.set(param, value)
                }
            }
            return newParams
        })
    }

    const removeSearchParamOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type, value, dataset } = event.target
        const param = dataset.filterName as string

        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            if (type === 'checkbox') {
                newParams.delete(param, value)
            } else if (type === 'text' || 'number'){
                newParams.delete(param)
            }
            return newParams
        })
    }

    const removeSearchParamOnClick = (param: string, value: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.delete(param, value)
            return newParams
        })
    }

    const addActiveFilterOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type, value, dataset } = event.target
        const filter = dataset.filterName as string

        setActiveFilters((prevState: any) => {
            if (type === 'checkbox') {
                if (prevState.hasOwnProperty(filter)) {
                    return {
                        ...prevState,
                        [filter]: [...prevState[filter], value]
                    }
                } else {
                    return {
                        ...prevState,
                        [filter]: [value]
                    }
                }
            } else if (type === 'text' || 'number') {
                return {
                    ...prevState,
                    [filter]: value
                }
            }
        })
    }

    const addActiveFilters = () => {
        const params = Array.from(searchParams)

        setActiveFilters((prevState: any) => {
            const updatedState = { ...prevState }

            params?.forEach(([key, value]: [string, string]) => {
                if (!updatedState[key]) {
                    updatedState[key] = [value]
                } else if (!updatedState[key].includes(value)) {
                    updatedState[key] = [...updatedState[key], value]
                }
            })
            return updatedState
        })
    }

    const removeActiveFilterOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, dataset } = event.target
        const filter = dataset.filterName as string

        setActiveFilters((prevState: any) => {
            const updatedFilter = prevState[filter].filter((item: string) => item !== value)
            if (updatedFilter.length > 0) {
                return {
                    ...prevState,
                    [filter]: updatedFilter
                }
            } else {
                const { [filter]: deletedKey, ...rest } = prevState
                return rest    
            }
        }) 
    }

    const removeActiveFilterOnClick = (filter: string, value: string) => {
        setActiveFilters((prevState: any) => {
            if (!Array.isArray(prevState[filter])) {
                const { [filter]: deletedKey, ...rest } = prevState
                return rest
            }
            const updatedFilter = prevState[filter].filter((item: string) => item !== value)
            if (updatedFilter.length > 0) {
                return {
                    ...prevState,
                    [filter]: updatedFilter
                }
            } else {
                const { [filter]: deletedKey, ...rest } = prevState
                return rest
            }
        })
    }

    const removeInputFromFiltering = (name: string) => {
        const filtersWrapper = document.querySelector<HTMLElement>('.filters')
        const inputs: NodeListOf<HTMLInputElement> | undefined = filtersWrapper?.querySelectorAll('.filter-input')
          
        inputs?.forEach((input) => {
            if (input.name === name) {
                switch (input.type) {
                    case 'checkbox':
                        input.checked = false
                        break
                    case 'number':
                        input.value = ''
                        break
                }
            }
        })
    }

    const addInputsToFiltering = () => {
        const filtersWrapper = document.querySelector<HTMLElement>('.filters')
        const inputs: NodeListOf<HTMLInputElement> | undefined = filtersWrapper?.querySelectorAll('.filter-input')
        const params = Array.from(searchParams)

        params?.forEach(([key, value]) => {
            inputs?.forEach((input) => {
                switch (input.type) {
                    case 'checkbox':
                        if (input.name === value) {
                            input.checked = true
                        }
                        break
                    case 'number':
                        if (input.name === key) {
                            input.value = value
                        }
                        break
                }
            })
        })
    }
    
    useEffect(() => {
        dispatch(fetchSuppliers({ category: category }))
        dispatch(fetchAttributes({ category: category }))
        dispatch(fetchProducts({ url: `products/${category}` }))
    }, [dispatch, category])

    useEffect(() => {
        dispatch(fetchProducts({ url: `products/${category}${location.search}` }))
    }, [])

    useEffect(() => {
        dispatch(fetchProducts({ url: `products/${category}${location.search}` }))
        addInputsToFiltering()
    }, [dispatch, location, searchParams])

    useEffect(() => {
        if (suppliersStatus === Status.FAILED) return
        if (attributesStatus === Status.FAILED) return
        addInputsToFiltering()
    }, [suppliersStatus, attributesStatus])

    useEffect(() => {
        addActiveFilters()
    }, [])

    return (
        <div className="my-6">
            <h1 className="text-3xl">{convertSlugToString(category)}</h1>
            <hr className="my-3" />
            <div className="flex flex-row justify-center w-full">
                <div className="filters w-[25%]">
                    <div className="flex flex-row items-center mb-5">
                        <CiFilter className="text-lg" />
                        <h1 className="text-lg font-medium">Filtry</h1>
                    </div>
                    <div className="mb-5">
                        <h1 className="text-lg font-medium">Producent</h1>
                        {suppliers &&
                            suppliers.map((supplier) =>
                                <div key={supplier.name} className="flex flex-row justify-start items-left">
                                    <div className="flex flex-row justify-start items-center my-1">
                                        <Input
                                            className="filter-input mx-2"
                                            type="checkbox"
                                            name={supplier.name}
                                            value={supplier.name}
                                            data-filter-name="supplier"
                                            onChange={(event) => {
                                                const { checked } = event.target

                                                if (checked) {
                                                    addSearchParamOnChange(event)
                                                    addActiveFilterOnChange(event)
                                                } else {
                                                    removeSearchParamOnChange(event)
                                                    removeActiveFilterOnChange(event)
                                                }
                                            }}
                                        />
                                        <Label
                                            htmlFor={supplier.name}
                                            label={`${supplier.name} (${supplier.products_count})`}
                                            className="text-lg"
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-5">
                        <h1 className="text-lg font-medium">Przedział cenowy</h1>
                        <div className="flex flex-row">
                            <Input
                                className="filter-input p-2 mx-2 w-32 border-[1px] border-black rounded-md"
                                type="number"
                                min={1}
                                max={99999}
                                name="priceMin"
                                placeholder="od"
                                data-filter-name="priceMin"
                                onBlur={(event) => {
                                    const { value } = event.target

                                    if (value === '') return
                                    if (Number(value) > 0) {
                                        addSearchParamOnChange(event)
                                        addActiveFilterOnChange(event)
                                    } else if (value === '') {
                                        removeSearchParamOnChange(event)
                                        removeActiveFilterOnChange(event)
                                    }
                                }}
                            />
                            <Input
                                className="filter-input p-2 mx-2 w-32 border-[1px] border-black rounded-md"
                                type="number"
                                min={1}
                                max={99999}
                                name="priceMax"
                                placeholder="do"
                                data-filter-name="priceMax"
                                onBlur={(event) => {
                                    const { value } = event.target
                                    if (value === '') return
                                    if (Number(value) > 0) {
                                        addSearchParamOnChange(event)
                                        addActiveFilterOnChange(event)
                                    } else {
                                        removeSearchParamOnChange(event)
                                        removeActiveFilterOnChange(event)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        {attributes && (
                            attributes.map((attribute) => (
                                <Fragment key={attribute.display_name}>
                                    <h1 className="text-lg font-medium">{attribute.display_name}</h1>
                                    {attribute.values.map((value) => (
                                        <div key={value.value} className="flex flex-row justify-start items-left">
                                            <div className="flex flex-row justify-start items-center my-1">
                                                <Input 
                                                    className="filter-input mx-2"
                                                    type="checkbox"
                                                    name={value.value}
                                                    value={value.value}
                                                    data-filter-name={attribute.name}
                                                    onBlur={(event) => {
                                                        const { type, value } = event.target

                                                        if (type === 'text' || type === 'number') {
                                                            if (value === '') return
                                                            if (Number(value) > 0) {
                                                                addSearchParamOnChange(event)
                                                                addActiveFilterOnChange(event)
                                                            } else {
                                                                removeSearchParamOnChange(event)
                                                                removeActiveFilterOnChange(event)
                                                            }
                                                        }
                                                    }}
                                                    onChange={(event) => {
                                                        const { type, checked } = event.target

                                                        if (type === 'checkbox') {
                                                            if (checked) {
                                                                addSearchParamOnChange(event)
                                                                addActiveFilterOnChange(event)
                                                            } else {
                                                                removeSearchParamOnChange(event)
                                                                removeActiveFilterOnChange(event)
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Label
                                                    htmlFor={value.value}
                                                    label={value.value}
                                                    className="text-lg"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Fragment> 
                            ))
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-[75%]">
                    <div className="flex flex-row">
                        {Object.entries(activeFilters).map(([key, values]: any) => (
                            <ActiveFilter key={key} name={key}>
                                {Array.isArray(values) ? (
                                    (values as string[]).map((item: string, idx) => (
                                        <ActiveFilterItem
                                            key={idx}
                                            text={item}
                                            onClick={() => {
                                                removeSearchParamOnClick(key, item)
                                                removeActiveFilterOnClick(key, item)
                                                removeInputFromFiltering(item)
                                                removeInputFromFiltering(key)
                                            }}
                                        />
                                    ))
                                ) : (
                                    <ActiveFilterItem
                                            text={values}
                                            onClick={() => {
                                                removeSearchParamOnClick(key, values)
                                                removeActiveFilterOnClick(key, values)
                                                removeInputFromFiltering(values)
                                                removeInputFromFiltering(key)
                                            }}
                                        />
                                )}
                            </ActiveFilter>
                        ))}
                    </div>
                    <div className="flex justify-center relative">
                        <div className="flex flex-row flex-wrap justify-left">
                            {products && (
                                <>
                                    {products.map((product) =>
                                        <ProductCard
                                            key={product.name}
                                            image={product.main_image}
                                            title={product.name}
                                            href={`/produkty/${convertStringToSlug(product.name)}`}
                                            availability={product.stock_quantity}
                                            price={product.price}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        {productsStatus === Status.LOADING && (
                            <>
                                <OverlayLoading />
                                <div className="absolute top-20 left-[50%] -translate-x-1/2 z-20">
                                    <Loader />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products