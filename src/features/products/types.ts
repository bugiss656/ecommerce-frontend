

export interface Supplier {
    id: string,
    name: string
}

export interface Image {
    alt: string,
    image: string
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