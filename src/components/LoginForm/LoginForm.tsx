import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { handleUserLogin, selectLoginError, selectLoginStatus, selectToken } from "../../features/account/loginSlice"
import Button from "../Button/Button"


type Inputs = {
    email: string,
    password: string
}

const LoginForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectLoginStatus)
    const error = useAppSelector(selectLoginError)
    const token = useAppSelector(selectToken)
    
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(handleUserLogin({ email: data.email, password: data.password }))
    }

    useEffect(() => {
        if (status === 'succeeded') {
            localStorage.setItem('authToken', token)
            navigate('/')
            location.reload()
        }
    }, [status])

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
            <Button 
                className="rounded-full text-white w-full py-3 mt-3 bg-green-500 hover:bg-green-600"
                type="submit"
                text="Zaloguj się"
            />
        </form>
    )
}

export default LoginForm