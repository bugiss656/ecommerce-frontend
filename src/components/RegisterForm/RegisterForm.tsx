import { useEffect, useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import Button from "../Button/Button"
import Input, { InputError, Label } from "../Input/Input"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { handleUserRegistration, selectRegistrationError, selectRegistrationStatus } from "../../features/account/registerSlice"
import { Status } from "../../features/types"


const schema = z.object({
    firstName: z.string().min(1, { message: 'Pole jest wymagane' }),
    lastName: z.string().min(1, { message: 'Pole jest wymagane' }),
    email: z.string().min(1, { message: 'Pole jest wymagane' }).email({ message: 'Niepoprawny adres e-mail' }),
    password: z.string().min(1, { message: 'Pole jest wymagane' }).min(6, { message: 'Hasło musi posiadać min. 6 znaków' })
})

export type RegistrationFields = z.infer<typeof schema>

const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [passwordVisibility, setPasswordVisibility] = useState('password')

    const status = useAppSelector(selectRegistrationStatus)
    const error = useAppSelector(selectRegistrationError)

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<RegistrationFields>({
        resolver: zodResolver(schema)
    })
    
    const onSubmit: SubmitHandler<RegistrationFields> = (data) => {
        dispatch(handleUserRegistration({ 
            email: data.email, 
            password: data.password, 
            firstName: data.firstName, 
            lastName: data.lastName 
        }))
    }

    useEffect(() => {
        if (status === Status.SUCCEEDED) {
            reset()
            navigate('/logowanie')
        }
    }, [status])

    useEffect(() => {
        if (status === Status.FAILED) {
            setError("email", { type: 'alreadyExists', message: error })
        }
    }, [status])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/3 p-5 shadow-md rounded-sm" data-testid="register-form">
            <h1 className="text-[30px] font-bold mb-3">Zarejestruj się</h1>
            <div className="relative flex flex-col my-3">
                <Label htmlFor="firstName" label="Imię" />
                <Input
                    type="text"
                    name="firstName"
                    autoComplete="off"
                    data-testid="firstName"
                    register={register}
                />
                {errors.firstName ? <InputError message={errors.firstName.message} /> : null}
            </div>
            <div className="relative flex flex-col my-3">
                <Label htmlFor="lastName" label="Nazwisko" />
                <Input
                    type="text"
                    name="lastName"
                    autoComplete="off"
                    data-testid="lastName"
                    register={register}
                />
                {errors.lastName ? <InputError message={errors.lastName.message} /> : null}
            </div>
            <div className="relative flex flex-col my-3">
                <Label htmlFor="email" label="E-mail" />
                <Input
                    type="email"
                    name="email"
                    autoComplete="off"
                    data-testid="email"
                    register={register}
                />
                {errors.email ? <InputError message={errors.email.message} /> : null}
            </div>
            <div className="relative my-3">
                <Label htmlFor="password" label="Hasło" />
                <div className="relative flex flex-col">
                    <Input
                        type={passwordVisibility as "text" | "password"}
                        name="password"
                        autoComplete="off"
                        data-testid="password"
                        register={register} 
                    />
                    <div className="absolute top-1/2 right-5 -translate-y-1/2">
                        {passwordVisibility === "password" ?
                            <button
                                type="button" 
                                onClick={() => setPasswordVisibility("text")}
                            >Pokaż</button> :
                            <button
                                type="button"  
                                onClick={() => setPasswordVisibility("password")} 
                            >Ukryj</button>
                        }
                    </div>
                </div>
                {errors.password ? <InputError message={errors.password.message} /> : null}
                {errors.password?.type === 'minLength' && <span className="text-sm text-red-500">Hasło musi mieć min. 6 znaków</span>}
            </div>

            <Button 
                className="rounded-full text-white w-full mt-3 py-3 bg-green-500 hover:bg-green-600" 
                type="submit"             
                text="Zarejestruj się" 
            />
        </form>
    )
}

export default RegisterForm