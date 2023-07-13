import Header from "../components/Header/Header"
import { Link } from "react-router-dom"
import Logo from "../components/Logo/Logo"
import logo from "../media/logo.png"
import RegisterForm from "../components/RegisterForm/RegisterForm"


const Register = () => {
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
                <RegisterForm />
                <div className="flex flex-col ml-24 mt-5">
                    <h2 className="text-[20px] font-bold">Dla czego warto mieć konto na ecommerce</h2>
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

export default Register;
