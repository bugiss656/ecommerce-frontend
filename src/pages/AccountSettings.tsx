import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchAccountData, selectAccount, selectAccountStatus } from "../features/account/accountSlice"
import { SubmitHandler, useForm } from "react-hook-form"

import ModalWrapper from "../components/ModalWrapper/ModalWrapper"
import { Modal, ModalBody, ModalHeader } from "../components/Modal/Modal"

import { IoMdClose } from "react-icons/io";
import Input, { InputError, Label } from "../components/Input/Input"
import Button from "../components/Button/Button"
import { 
    updateUserData, 
    selectUpdateAccountError, 
    selectUpdateAccountStatus, 
} from "../features/account/updateAccountSlice"
import {
    selectUpdateEmailStatus,
    selectUpdateEmailError
} from "../features/account/updateEmailSlice"
import { 
    checkUserPassword, 
    selectCheckPasswordError, 
    selectCheckPasswordStatus 
} from "../features/account/checkPasswordSlice"
import { selectUpdatePasswordError, selectUpdatePasswordStatus } from "../features/account/updatePasswordSlice"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Status } from "../features/types"
import Alert from "../components/Alert/Alert"


const accountFormSchema = z
    .object({
        firstName: z.string().min(1, { message: 'Pole jest wymagane' }),
        lastName: z.string().min(1, { message: 'Pole jest wymagane' }),
        phone: z.string().min(1, { message: 'Pole jest wymagane' }).max(9, { message: 'Niepoprawny numer telefonu' })
    })

const emailFormSchema = z
    .object({
        currentEmail: z.string(),
        newEmail: z.string().min(1, { message: 'Pole jest wymagane' }).email({ message: 'Niepoprawny adres e-mail' }),
        confirmPassword: z.string().min(1, { message: 'Pole jest wymagane' })
    })

const passwordFormSchema = z
    .object({
        currentPassword: z.string().min(1, { message: 'Pole jest wymagane' }),
        newPassword: z.string().min(1, { message: 'Pole jest wymagane' }),
        repeatPassword: z.string().min(1, { message: 'Pole jest wymagane' })
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: 'Nowe hasło nie może być takie samo jak obecne',
        path: ['newPassword']
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
        message: 'Wprowadzone nowe hasła różnią się od siebie',
        path: ['repeatPassword']
    })

type accountFormFields = z.infer<typeof accountFormSchema>

type emailFormFields = z.infer<typeof emailFormSchema>

type passwordFormFields = z.infer<typeof passwordFormSchema>

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

    const accountStatus = useAppSelector(selectAccountStatus)
    const account = useAppSelector(selectAccount)

    const updateAccountStatus = useAppSelector(selectUpdateAccountStatus)
    const updateAccountError = useAppSelector(selectUpdateAccountError)

    const checkPasswordStatus = useAppSelector(selectCheckPasswordStatus)
    const checkPasswordError = useAppSelector(selectCheckPasswordError)

    const updateEmailStatus = useAppSelector(selectUpdateEmailStatus)
    const updateEmailError = useAppSelector(selectUpdateEmailError)

    const updatePasswordStatus = useAppSelector(selectUpdatePasswordStatus)
    const updatePasswordError = useAppSelector(selectUpdatePasswordError)

    const [isAccountDataModalOpen, setIsAccountDataModalOpen] = useState(false)
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

    const [isAlertActive, setIsAlertActive] = useState(false)

    const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState('password')
    const [newPasswordVisibility, setNewPasswordVisibility] = useState('password')
    const [repeatPasswordVisibility, setRepeatPasswordVisibility] = useState('password')
    
    const closeModalOnOuterClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement

        if (!target.closest('.modal')) {
            setIsAccountDataModalOpen(false)
            setIsEmailModalOpen(false)
            setIsPasswordModalOpen(false)
        }
    }

    const {
        register: registerAccount, 
        setValue: setAccountValue, 
        handleSubmit: handleAccountSubmit, 
        reset: resetAccountForm, 
        formState: { 
            errors: accountErrors, 
            isSubmitted: isAccountFormSubmitted
        }
    } = useForm<accountFormFields>({
        defaultValues: {
            firstName: account?.first_name,
            lastName: account?.last_name,
            phone: account?.phone
        },
        resolver: zodResolver(accountFormSchema)
    })

    const {
        register: registerEmail, 
        watch: watchEmailFormInputs,
        setValue: setEmailValue, 
        handleSubmit: handleEmailSubmit,
        reset: resetEmailForm, 
        setError: setEmailError,
        formState: { 
            errors: emailErrors,
            isSubmitted: isEmailFormSubmitted 
        }
    } = useForm<emailFormFields>({
        defaultValues: {
            currentEmail: account?.email,
        },
        resolver: zodResolver(emailFormSchema)
    })

    const {
        register: registerPassword, 
        watch: watchPasswordFormInputs,
        setValue: setPasswordValue, 
        handleSubmit: handlePasswordSubmit,
        reset: resetPasswordForm, 
        setError: setPasswordError,
        formState: { 
            errors: passwordErrors,
            isSubmitted: isPasswordFormSubmitted 
        }
    } = useForm<passwordFormFields>({
        resolver: zodResolver(passwordFormSchema)
    })

    const newEmail = watchEmailFormInputs('newEmail')
    const newPassword = watchPasswordFormInputs('newPassword')

    const onAccountFormSubmit: SubmitHandler<accountFormFields> = async (data: { firstName: string, lastName: string, phone: string }) => {
        await dispatch(updateUserData({ 
            userId: account?.id, 
            data: { 
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone 
            } 
        }))

        setIsAccountDataModalOpen(false)
        resetAccountForm()
        setIsAlertActive(true)
    }

    const onEmailFormSubmit: SubmitHandler<emailFormFields> = async (data: { currentEmail: string, newEmail: string, confirmPassword: string }) => {
        await dispatch(checkUserPassword({
            userId: account?.id,
            data: {
                password: data.confirmPassword
            }
        }))   
    }

    const onPasswordFormSubmit: SubmitHandler<passwordFormFields> = async (data: { currentPassword: string, newPassword: string, repeatPassword: string }) => {
        await dispatch(checkUserPassword({
            userId: account?.id,
            data: {
                password: data.currentPassword
            }
        }))
    }

    useEffect(() => {
        setAccountValue('firstName', account?.first_name as string)
        setAccountValue('lastName', account?.last_name as string)
        setAccountValue('phone', account?.phone as string)
        setEmailValue('currentEmail', account?.email as string)
    }, [accountStatus])

    useEffect(() => {
        dispatch(fetchAccountData())
    }, [updateAccountStatus, updateEmailStatus, updatePasswordStatus])

    useEffect(() => {
        if (checkPasswordStatus === Status.SUCCEEDED) {
            dispatch(updateUserData({
                userId: account?.id,
                data: {
                    email: newEmail,
                }
            }))

            setIsEmailModalOpen(false)
            resetEmailForm()
            setIsAlertActive(true)
        } else if (checkPasswordStatus === Status.FAILED) {
            console.error('Password check failed')
            setEmailError('confirmPassword', { type: 'currentPasswordCheck', message: 'Wprowadzone obecne hasło jest niepoprawne' })
        }

    }, [checkPasswordStatus, dispatch]) 

    useEffect(() => {
        if (checkPasswordStatus === Status.SUCCEEDED) {
            dispatch(updateUserData({
                userId: account?.id,
                data: {
                    password: newPassword
                }
            }))

            setIsPasswordModalOpen(false)
            resetPasswordForm()
            setIsAlertActive(true)
        } else if (checkPasswordStatus === Status.FAILED) {
            console.error('Password check failed')
            setPasswordError('root', { type: 'currentPasswordCheck', message: 'Wprowadzone obecne hasło jest niepoprawne' })
        }
    }, [checkPasswordStatus, dispatch])

    return (
        <>
            <h1 className="text-3xl mb-8 font-medium">Ustawienia konta</h1>

            {isAlertActive && 
                <Alert 
                    type="success" 
                    message="Pomyślnie zaaktualizowano dane konta." 
                    onClick={() => setIsAlertActive(false)}
                />
            }

            <h1 className="text-2xl mb-4">Dane konta</h1>

            <div className="my-8">
                <h1 className="text-lg">Twoje dane</h1>
                <InfoCard>
                    <div className="">
                        <p className="font-medium">{account?.first_name} {account?.last_name}</p>
                        <p>{account?.phone}</p>
                    </div>
                    <div className="">
                        <button 
                            onClick={() => setIsAccountDataModalOpen(true)}
                            className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200"
                        >Edytuj</button>
                        {isAccountDataModalOpen && 
                            <ModalWrapper onClick={(e) => closeModalOnOuterClick(e)} >
                                <Modal>
                                    <ModalHeader>
                                        <h1 className="text-2xl">Twoje dane</h1>
                                        <IoMdClose 
                                            className="text-3xl rounded-md hover:cursor-pointer hover:bg-gray-300"
                                            onClick={() => setIsAccountDataModalOpen(false)} 
                                        />
                                    </ModalHeader>
                                    <ModalBody>
                                        <form onSubmit={handleAccountSubmit(onAccountFormSubmit)} className="w-full">
                                            <div className="mx-2 my-4">
                                                <Label
                                                    htmlFor="firstName"
                                                    label="Imię" 
                                                />
                                                <Input
                                                    type="text" 
                                                    name="firstName"
                                                    register={registerAccount}
                                                />
                                                {accountErrors.firstName ? <InputError message={accountErrors.firstName.message} /> : null}
                                                
                                            </div>
                                            <div className="mx-2 my-4">
                                                <Label
                                                    htmlFor="lastName"
                                                    label="Nazwisko" 
                                                />
                                                <Input 
                                                    type="text" 
                                                    name="lastName"
                                                    register={registerAccount}
                                                />
                                                {accountErrors.lastName ? <InputError message={accountErrors.lastName.message} /> : null}
                                            </div>
                                            <div className="mx-2 my-4">
                                                <Label
                                                    htmlFor="phone"
                                                    label="Telefon" 
                                                />
                                                <Input 
                                                    type="text" 
                                                    name="phone"
                                                    register={registerAccount}
                                                />
                                                {accountErrors.phone ? <InputError message={accountErrors.phone.message} /> : null}
                                            </div>
                                            <div className="mt-5 mb-3">
                                                <Button 
                                                    className="rounded-md w-full text-white bg-blue-500 text-md px-20 py-2 hover:bg-blue-600"
                                                    type="submit"
                                                    text="Zapisz"
                                                />
                                            </div>
                                        </form>
                                    </ModalBody>
                                </Modal>
                            </ModalWrapper>
                        }
                    </div>
                </InfoCard>
            </div>

            <div className="my-8">
                <h1 className="text-lg">Adres e-mail</h1>
                <InfoCard>
                    <p>{account?.email}</p>
                    <button
                        onClick={() => setIsEmailModalOpen(true)} 
                        className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200"
                    >Edytuj</button>
                    {isEmailModalOpen &&
                        <ModalWrapper onClick={(e) => closeModalOnOuterClick(e)}>
                            <Modal>
                                <ModalHeader>
                                    <h1 className="text-2xl">Zmiana adresu e-mail</h1>
                                    <IoMdClose 
                                        className="text-3xl rounded-md hover:cursor-pointer hover:bg-gray-300"
                                        onClick={() => setIsEmailModalOpen(false)} 
                                    />
                                </ModalHeader>
                                <ModalBody>
                                    <form onSubmit={handleEmailSubmit(onEmailFormSubmit)} className="w-full">
                                        <div className="mx-2 my-3">
                                            <Label
                                                htmlFor="currentEmail"
                                                label="Obecny e-mail" 
                                            />
                                            <Input
                                                type="text" 
                                                name="currentEmail"
                                                disabled
                                                register={registerEmail}
                                            />
                                        </div>
                                        <div className="mx-2 my-3">
                                            <Label
                                                htmlFor="newEmail"
                                                label="Nowy e-mail" 
                                            />
                                            <Input
                                                type="text" 
                                                name="newEmail"
                                                register={registerEmail}
                                            />
                                            {emailErrors.newEmail ? <InputError message={emailErrors.newEmail.message} /> : null}
                                        </div>
                                        <div className="mx-2 my-3">
                                            <Label
                                                htmlFor="confirmPassword"
                                                label="Potwierdź hasłem" 
                                            />
                                            <Input
                                                type="text" 
                                                name="confirmPassword"
                                                register={registerEmail}
                                            />
                                            {emailErrors.confirmPassword ? <InputError message={emailErrors.confirmPassword.message} /> : null}
                                        </div>
                                        <div className="mt-5 mb-3">
                                            <Button
                                                className="rounded-md w-full text-white bg-blue-500 text-md px-20 py-2 hover:bg-blue-600"
                                                type="submit"
                                                text="Zapisz"
                                            />
                                        </div>
                                    </form>
                                </ModalBody>
                            </Modal>
                        </ModalWrapper>
                    }
                </InfoCard>
            </div>

            <div className="my-8">
                <h1 className="text-lg">Hasło</h1>
                <InfoCard>
                    <p className="text-2xl">&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</p>
                    <button 
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="px-4 py-2 text-sky-500 hover:bg-sky-100 hover:rounded-full transition-all ease-in-out duration-200"
                    >Edytuj</button>
                    {isPasswordModalOpen &&
                        <ModalWrapper onClick={(e) => closeModalOnOuterClick(e)}>
                            <Modal>
                                <ModalHeader>
                                    <h1 className="text-2xl">Zmiana hasła</h1>
                                    <IoMdClose 
                                        className="text-3xl rounded-md hover:cursor-pointer hover:bg-gray-300"
                                        onClick={() => setIsPasswordModalOpen(false)} 
                                    />
                                </ModalHeader>
                                <ModalBody>
                                    <form onSubmit={handlePasswordSubmit(onPasswordFormSubmit)} className="w-full">
                                        <div className="relative mx-2 my-3">
                                            <Label
                                                htmlFor="currentPassword"
                                                label="Obecne hasło" 
                                            />
                                            <div className="relative flex flex-col">
                                                <Input
                                                    type={currentPasswordVisibility as "text" | "password"} 
                                                    name="currentPassword"
                                                    register={registerPassword}
                                                />
                                                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                                                    {currentPasswordVisibility === "password" ?
                                                        <button
                                                            type="button"
                                                            onClick={() => setCurrentPasswordVisibility("text")}
                                                        >Pokaż</button> :
                                                        <button
                                                            type="button"
                                                            onClick={() => setCurrentPasswordVisibility("password")}
                                                        >Ukryj</button>
                                                    }
                                                </div>
                                                {passwordErrors.currentPassword ? <InputError message={passwordErrors.currentPassword.message} /> : null}
                                            </div>
                                        </div>
                                        <div className="relative mx-2 my-3">
                                            <Label
                                                htmlFor="newPassword"
                                                label="Nowe hasło" 
                                            />
                                            <div className="relative flex flex-col">
                                                <Input
                                                    type={newPasswordVisibility as "text" | "password"} 
                                                    name="newPassword"
                                                    register={registerPassword}
                                                />
                                                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                                                    {newPasswordVisibility === "password" ?
                                                        <button
                                                            type="button"
                                                            onClick={() => setNewPasswordVisibility("text")}
                                                        >Pokaż</button> :
                                                        <button
                                                            type="button"
                                                            onClick={() => setNewPasswordVisibility("password")}
                                                        >Ukryj</button>
                                                    }
                                                </div>
                                                {passwordErrors.newPassword ? <InputError message={passwordErrors.newPassword.message} /> : null}
                                            </div>
                                        </div>
                                        <div className="relative mx-2 my-3">
                                            <Label
                                                htmlFor="repeatPassword"
                                                label="Powtórz nowe hasło" 
                                            />
                                            <div className="relative flex flex-col">
                                                <Input
                                                    type={repeatPasswordVisibility as "text" | "password"}
                                                    name="repeatPassword"
                                                    register={registerPassword}
                                                />
                                                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                                                    {repeatPasswordVisibility === "password" ?
                                                        <button
                                                            type="button"
                                                            onClick={() => setRepeatPasswordVisibility("text")}
                                                        >Pokaż</button> :
                                                        <button
                                                            type="button"
                                                            onClick={() => setRepeatPasswordVisibility("password")}
                                                        >Ukryj</button>
                                                    }
                                                </div>
                                                {passwordErrors.repeatPassword ? <InputError message={passwordErrors.repeatPassword.message} /> : null}
                                            </div>
                                            {passwordErrors.root ? <InputError message={passwordErrors.root.message} /> : null}
                                        </div>
                                        <div className="mt-5 mb-3">
                                            <Button
                                                className="rounded-md w-full text-white bg-blue-500 text-md px-20 py-2 hover:bg-blue-600"
                                                type="submit"
                                                text="Zapisz"
                                            />
                                        </div>
                                    </form>
                                </ModalBody>
                            </Modal>
                        </ModalWrapper>
                    }
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