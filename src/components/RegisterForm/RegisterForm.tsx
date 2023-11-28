import { useEffect, useState } from "react"
import { 
    useForm,
    SubmitHandler 
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"
import Button from "../Button/Button"


type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    // phone: string
    // re_password: string
}

const RegisterForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset, setError, formState, formState: { errors } } = useForm<Inputs>()
    const { register: registerUser, isRegistrationSuccess, error } = useRegister()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        registerUser(data.email, data.password, data.firstName, data.lastName)
    }
    const [passwordVisibility, setPasswordVisibility] = useState('password')

    useEffect(() => {
        if (isRegistrationSuccess) {
            reset()
            navigate('/logowanie')
        }
    }, [isRegistrationSuccess])

    useEffect(() => {
        if (error) {
            setError("email", { type: 'alreadyExists', message: error })
        }
    }, [error])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/3 p-5 shadow-md rounded-sm" data-testid="register-form">
            <h1 className="text-[30px] font-bold mb-3">Zarejestruj się</h1>

            <div className="relative flex flex-col my-6">
                <label htmlFor="firstName" className="absolute -top-6 left-0">Imię</label>
                <input 
                    type="text" 
                    role="input"
                    id="firstName"
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    data-testid="firstName"
                    {...register("firstName", { required: true })} 
                />
                {errors.firstName?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
            </div>

            <div className="relative flex flex-col my-6">
                <label htmlFor="lastName" className="absolute -top-6 left-0">Nazwisko</label>
                <input 
                    type="text" 
                    role="input"
                    id="lastName"
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    data-testid="lastName"
                    {...register("lastName", { required: true })} 
                />
                {errors.lastName?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
            </div>

            <div className="relative flex flex-col my-6">
                <label htmlFor="email" className="absolute -top-6 left-0">E-mail</label>
                <input 
                    type="text" 
                    role="input"
                    id="email"
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    data-testid="email"
                    {...register("email", { 
                        required: true, 
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Niepoprawny adres email"
                        }
                    })}
                />
                {errors.email?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
                {errors.email?.type === 'pattern' && <span className="text-sm text-red-500">{errors.email.message}</span>}
                {errors.email?.type === 'alreadyExists' && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            <div className="relative my-6">
                <label htmlFor="password" className="absolute -top-6 left-0">Hasło</label>
                <div className="relative flex flex-col">
                    <input 
                        type={passwordVisibility} 
                        role="input"
                        id="password"
                        className="border rounded-full px-4 py-2 focus:outline-0" 
                        autoComplete="off"
                        data-testid="password" 
                        {...register("password", { 
                            required: true,
                            minLength: 6
                        })} 
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
                {errors.password?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
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