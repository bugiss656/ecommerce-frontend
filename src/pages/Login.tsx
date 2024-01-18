import Header from "../components/Header/Header"
import { Link } from "react-router-dom"
import Logo from "../components/Logo/Logo"
import logo from "../media/logo.png"
import LoginForm from "../components/LoginForm/LoginForm"
import Button from "../components/Button/Button"


const Login = () => {
    return (
        <>
            <Header>
                <div className="container flex flex-row justify-between content-center py-[15px]">
                    <div className="flex flex-row items-center">
                        <Link to="/">
                            <Logo src={logo} alt="" />
                        </Link>
                    </div>
                </div>
            </Header>
            <div className="flex flex-row justify-center my-10">
                <LoginForm />
                <div className="flex flex-col ml-24 mt-5">
                    <h1 className="text-[30px] font-bold">Nie masz konta?</h1>
                    <Button 
                        className="rounded-full border-[1px] w-full text-blue-500 bg-white border-blue-500 py-3 my-8 hover:text-white hover:bg-blue-500"
                        type="button"
                        href="/rejestracja"
                        text="Załóż konto"
                    />
                    <h2 className="text-[20px] font-bold">Dla czego warto mieć konto na ecommerce:</h2>
                    <div className="flex flex-col my-3">
                        <div className="my-3">
                            <span></span>
                            <span>Zamawiaj szybciej</span>
                        </div>
                        <div className="my-3">
                            <span></span>
                            <span>Sprawdzaj poprzednie zamówienia</span>
                        </div>
                        <div className="my-3">
                            <span></span>
                            <span>Śledź status zamówienia</span>
                        </div>
                        <div className="my-3">
                            <span></span>
                            <span>Korzystaj z rabatów i promocji</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login