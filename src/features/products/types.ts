

export interface Supplier {
    id: string,
    name: string,
    products_count: number
}

export interface Image {
    alt: string,
    image: string
}

export interface Attribute {
    name: string,
    display_name: string,
    values: [
        {
            value: string
        }
    ]
}

export interface Product {
    name: string,
    slug: string,
    category: string,
    supplier: Supplier,
    stock_quantity: number,
    price: number,
    main_image: string,
    description: string,
    images?: Image[]
}