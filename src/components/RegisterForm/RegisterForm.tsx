import { useEffect } from "react"
import { 
    useForm,
    SubmitHandler 
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"


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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/3 p-5 shadow-md rounded-sm">
            <h1 className="text-[30px] font-bold mb-3">Zarejestruj się</h1>

            <div className="form-control flex flex-col my-3">
                <label htmlFor="">Imię</label>
                <input 
                    type="text" 
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    {...register("firstName", { required: true })} 
                />
                {errors.firstName?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
            </div>

            <div className="form-control flex flex-col my-3">
                <label htmlFor="">Nazwisko</label>
                <input 
                    type="text" 
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
                    {...register("lastName", { required: true })} 
                />
                {errors.lastName?.type === 'required' && <span className="text-sm text-red-500">Pole jest wymagane</span>}
            </div>

            <div className="form-control flex flex-col my-3">
                <label htmlFor="">E-mail</label>
                <input 
                    type="text" 
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
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
                <label htmlFor="">Hasło</label>
                <input 
                    type="text" 
                    className="border rounded-full px-4 py-2 focus:outline-0" 
                    autoComplete="off" 
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

            <input 
                type="submit" 
                className="bg-green-600 text-white rounded-full py-3 my-3 hover:cursor-pointer" 
                value="Zarejestruj się" 
            />
        </form>
    )
}

export default RegisterForm