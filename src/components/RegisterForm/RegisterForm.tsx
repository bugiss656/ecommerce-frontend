import { useEffect } from "react"
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

            <div className="form-control flex flex-col my-3">
                <label htmlFor="firstName">Imię</label>
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

            <div className="form-control flex flex-col my-3">
                <label htmlFor="lastName">Nazwisko</label>
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

            <div className="form-control flex flex-col my-3">
                <label htmlFor="email">E-mail</label>
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

            {/* <div className="form-control flex flex-col my-3">
                <label htmlFor="">Telefon</label>
                <input 
                    type="text" 
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    {...register("phone", { 
                        required: true,
                    })} 
                />
                {errors.phone?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
            </div> */}

            <div className="form-control flex flex-col my-3">
                <label htmlFor="password">Hasło</label>
                <input 
                    type="text" 
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
                {errors.password?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
                {errors.password?.type === 'minLength' && <span className="text-sm text-red-500">Hasło musi mieć min. 6 znaków</span>}
            </div>

            {/* <div className="form-control flex flex-col my-3">
                <label htmlFor="">Powtórz hasło</label>
                <input 
                    type="text" 
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    {...register("re_password", { 
                        required: true,
                        minLength: 8
                    })} 
                />
                {errors.re_password?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
                {errors.re_password?.type === 'minLength' && <span className="text-sm text-red-500">Hasło musi mieć min. 6 znaków</span>}
            </div> */}

            <Button 
                className="rounded-full text-white w-full mt-3 py-3 bg-green-500 hover:bg-green-600" 
                type="submit"             
                text="Zarejestruj się" 
            />
        </form>
    )
}

export default RegisterForm