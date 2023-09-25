

type AddressCardProps = {
    name: string,
    street?: string,
    postal?: string,
    town?: string,
    phone: string,
    email: string
}

const AddressCard = ({ name, street, postal, town, phone, email }: AddressCardProps) => {
    return (
        <div className="flex flex-col px-2 border-[1px] border-gray-300 rounded-md">
            <div className="px-4 py-4">
                <p className="font-semibold">{name}</p>
                <p>{street}</p>
                <p>{postal}</p>
                <p>{town}</p>
                <p>{phone}</p>
                <p>{email}</p>
            </div>
            <div className="flex pb-2">
                <button className="px-4 py-2 text-red-500 hover:bg-red-100 hover:rounded-full transition-all ease-in-out duration-200">Usuń</button>
                <button className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200">Edytuj</button>
            </div>
        </div>
    )
}

const OrderInfo = () => {
    return (
        <>
            <div className="mb-14">
                <h1 className="text-3xl font-semibold mb-3">Dane do zamówień</h1>
                <p className="w-3/4">Tutaj znajdziesz zapisane adresy i dane do zamówień, dzięki czemu nie będziesz musiał ich wpisywać podczas składania zamówienia.</p>
            </div>

            <section className="mb-12">
                <h1 className="text-xl mb-6">Dane odbiorcy i adresy dostawy</h1>
                <div className="grid grid-cols-3 gap-3">
                    <AddressCard 
                        name="John Doe"
                        phone="111 222 333"
                        email="johndoe@mail.com"
                    />
                    <AddressCard 
                        name="John Doe"
                        phone="111 222 333"
                        email="johndoe@mail.com"
                    />
                    <AddressCard 
                        name="John Doe"
                        phone="111 222 333"
                        email="johndoe@mail.com"
                    />
                </div>
            </section>
            <section className="mb-10">
                <h1 className="text-xl mb-6">Dane do faktury</h1>
                <div className="grid grid-cols-3 gap-3">
                    <AddressCard 
                        name="John Doe"
                        phone="111 222 333"
                        email="johndoe@mail.com"
                    />
                    <AddressCard 
                        name="John Doe"
                        phone="111 222 333"
                        email="johndoe@mail.com"
                    />
                    <AddressCard 
                        name="John Doe"
                        phone="111 222 333"
                        email="johndoe@mail.com"
                    />
                </div>
            </section>
        </>
    )
}

export default OrderInfo