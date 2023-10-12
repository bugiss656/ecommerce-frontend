

type ShoppingListItem = {
    name: string,
    price: string,
    quantity?: number,
    imageSrc: string
}

type ShoppingListCard = {
    name: string,
    lastUpdate: string,
    products: ShoppingListItem[],
    price: string
}

type ShoppingList = {
    children: null | React.ReactElement | React.ReactElement[]
}

export const ShoppingListCard = ({ name, lastUpdate, products, price }: ShoppingListCard) => {
    return (
        <a href="" className="flex flex-col px-6 py-6 shadow-primary hover:shadow-secondary rounded-lg mb-6">
            <div className="mb-4">
                <h1 className="text-lg font-medium">{name}</h1>
                <p className="text-gray-500">{lastUpdate} (ostatnia zmiana)</p>
            </div>
            <div className="flex items-center">
                {products.map((product) =>
                    <div className="mx-4">
                        <img src={product.imageSrc} alt="product" />
                    </div>
                )}
            </div>
            <div className="">
                <p className="mt-4">{price}</p>
            </div>
        </a>
    )
}

export const ShoppingListItem = ({ name, price, imageSrc }: ShoppingListItem) => {
    return (
        <li className="flex flex-row justify-center items-center">
            <input type="checkbox" className="" />
            <img src={imageSrc} alt="" />
            <div className="">
                <a href="">{name}</a>
            </div>
            <div className="">
                <p>{price}</p>
            </div>
            <div className="">
                <select name="" id="">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                </select>
            </div>
        </li>
    )
}

export const ShoppingList = ({ children }: ShoppingList) => {
    return (
        <ul className="">
            {/* <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-2xl">Listy zakupowe</h1>
                <a href="" className="px-3 py-1 rounded hover:bg-slate-100">Zobacz więcej</a>
            </div> */}
            {/* {items.map((item: ShoppingListItem) =>
                <ShoppingListItem 
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    imageSrc={item.imageSrc}
                />
            )} */}
            {children}
        </ul>
    )
}