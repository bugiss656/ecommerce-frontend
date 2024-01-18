import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { handleUserLogin, selectLoginError, selectLoginStatus, selectToken } from "../../features/account/loginSlice"

import Input, { InputError } from "../Input/Input"
import Button from "../Button/Button"


const schema = z.object({
    email: z.string().min(1, { message: 'Pole jest wymagane' }).email({message: 'Niepoprawny adres e-mail'}),
    password: z.string().min(1, { message: 'Pole jest wymagane' })
})

type FormFields = z.infer<typeof schema>

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { register, handleSubmit, setError, formState: { errors }} = useForm<FormFields>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(schema)
    })
    
    const status = useAppSelector(selectLoginStatus)
    const error = useAppSelector(selectLoginError)
    const token = useAppSelector(selectToken)
    
    const onSubmit: SubmitHandler<FormFields> = (data) => {
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
        if (status === 'failed') {
            setError('root', { type: 'invalidData', message: 'Sprawdź, czy adres e-mail i hasło są poprawne' })
        }
    }, [status])

    useEffect(() => {
        if (localStorage.getItem('authToken')) navigate('/')
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/3 p-5 shadow-primary rounded-sm" data-testid="login-form">
            <h1 className="text-[30px] font-bold mb-3" data-testid="form-heading">Zaloguj się</h1>
            <div className="my-3">
                <Input
                    type="email"
                    name="email"
                    label="E-mail"
                    errors={errors}
                    register={register}
                />
            </div>
            <div className="my-3">
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    errors={errors}
                    register={register}
                />
            </div>
            {errors.root ? <InputError message={errors.root.message} /> : null}
            <Button 
                className="rounded-full text-white w-full py-3 mt-3 bg-green-500 hover:bg-green-600"
                type="submit"
                text="Zaloguj się"
            />
        </form>
    )
}

export default LoginForm