'use client';

import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

interface input {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<input>()

    const onSubmit = handleSubmit(async (data)=> {
        console.log(data);
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (response?.error) {
            alert(response.error)
        } else {
           router.push('/dashboard');
           router.refresh()
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <input type="email"
                   {...register('email',
                       {
                           required: {
                               value: true,
                               message: 'Email is required'
                           },
                       })}

            />
            {
                errors.email && <p>{errors.email.message}</p>
            }
            <input type="password"
                   {...register('password',
                       {
                           required: {
                               value: true,
                               message: 'Password is required'
                           },
                       })}

            />
            {
                errors.password && <p>{errors.password.message}</p>
            }
            <button>
                Login
            </button>
        </form>
    );
};

export default LoginPage
