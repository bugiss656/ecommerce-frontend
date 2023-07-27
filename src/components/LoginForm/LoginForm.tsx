import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"


type Inputs = {
    email: string,
    password: string
}

const LoginForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const { login: loginUser, isLoginSuccess } = useLogin()
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        loginUser(data.email, data.password)
    }

    useEffect(() => {
        if (isLoginSuccess) {
            navigate('/')
        }
    }, [isLoginSuccess])

    useEffect(() => {
        if (localStorage.getItem('authToken')) navigate('/')
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/3 p-5 shadow-md rounded-sm">
            <h1 className="text-[30px] font-bold mb-3">Zaloguj się</h1>
            
            <div className="form-control flex flex-col my-3">
                <label htmlFor="">E-mail</label>
                <input type="text" className="border rounded-full px-4 py-2 focus:outline-0" autoComplete="off" {...register("email")} />
            </div>
            
            <div className="form-control flex flex-col my-3">
                <label htmlFor="">Hasło</label>
                <input type="text" className="border rounded-full px-4 py-2 focus:outline-0" autoComplete="off" {...register("password")} />
            </div>

            <input type="submit" className="bg-slate-500 text-white rounded-full py-3 my-3 hover:cursor-pointer" value="Zaloguj się" />
        </form>
    )
}

export default LoginForm