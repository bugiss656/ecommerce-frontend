import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectAccount, selectAccountStatus } from "../features/account/accountSlice"


export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[]
}

const InfoCard = ({ children }: InfoCardProps) => {
    return (
        <div className="flex justify-between items-center p-4 my-3 border-[1px] border-gray-300 rounded-md">
            {children}
        </div>
    )
}

const AccountSettings = () => {
    const dispatch = useAppDispatch()

    const status = useAppSelector(selectAccountStatus)
    const account = useAppSelector(selectAccount)

    return (
        <>
            <h1 className="text-3xl mb-8 font-medium">Ustawienia konta</h1>

            <h1 className="text-2xl mb-4">Dane konta</h1>

            <div className="my-8">
                <h1 className="text-lg">Twoje dane</h1>
                <InfoCard>
                    <div className="">
                        <p className="font-medium">{account?.first_name} {account?.last_name}</p>
                        <p>tel. 111 111 111</p>
                    </div>
                    <div className="">
                        <button className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200">Edytuj</button>
                    </div>
                </InfoCard>
            </div>

            <div className="my-8">
                <h1 className="text-lg">Adres e-mail</h1>
                <InfoCard>
                    <p>{account?.email}</p>
                    <button className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200">Edytuj</button>
                </InfoCard>
            </div>

            <div className="my-8">
                <h1 className="text-lg">Hasło</h1>
                <InfoCard>
                    <p className="text-2xl">&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</p>
                    <button className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200">Edytuj</button>
                </InfoCard>
            </div>

            <div className="my-8">
                <h1 className="text-2xl mb-4">Usuwanie konta</h1>
                <p className="">
                    Jeśli klikniesz w ten przycisk, usuniesz swoje konto w naszym sklepie. 
                    Upewnij się, że na pewno chcesz to zrobić – Twojego konta nie będziemy mogli przywrócić.
                </p>
                <div className="py-5">
                    <button className="rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200">Usuń konto</button>
                </div>
            </div>
        </>
    )
}

export default AccountSettings