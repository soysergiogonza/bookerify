'use client';

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

type inputs = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<inputs>();

    const onSubmit = handleSubmit(async (data) => {
       if (data.password !== data.passwordConfirm) {
           return alert('passwords do not match');
       }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

       if (response.ok) {
              router.push('/auth/login');
       } else {
              const data = await response.json();
           console.log(data.message);
       }
    });

    return (
        <form onSubmit={onSubmit}>
            <input type="text"
                  {...register('name',
                            {required: {
                                value: true,
                                    message: 'name is required'
                            }})}
            />
          {errors.name && (
                    <span>{errors.name.message}</span>
            )}
            <input type="email"
                     {...register('email',
                            {required: {
                                value: true,
                                    message: 'email is required'
                            }})}
            />
            {errors.email && (
                    <span>{errors.email.message}</span>
            )}
            <input type="password"
                      {...register('password',
                            {required: {
                                value: true,
                                    message: 'Password is required'
                            }})}
            />
         {errors.password && (
                    <span>{errors.password.message}</span>
            )}
            <input type="passwordConfirm"
                        {...register('passwordConfirm',
                            {required: {
                                value: true,
                                    message: 'passwordConfirm is required'
                            }})}
            />
            {errors.passwordConfirm && (
                    <span>{errors.passwordConfirm.message}</span>
            )}
            <button>
               Register
            </button>
        </form>
    );
};

export default RegisterPage
