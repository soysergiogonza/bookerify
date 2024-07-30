'use client';

import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import { TiAt } from "react-icons/ti";

import styles from './Login.module.css'
import {MdLock} from "react-icons/md";
import Link from "next/link";

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
        <form onSubmit={onSubmit} className={styles.form}>
            <p className={styles.heading}>
                Iniciar Sesión
</p>
            <label htmlFor="email" className={styles.field}>
                <TiAt className={styles.inputIcon}/>
                <input type="email" className={styles.inputField} placeholder="Email"
                       {...register('email',
                           {
                               required: {
                                   value: true,
                                   message: 'Email is required'
                               },
                           })}
                />
            </label>
            {
                errors.email && <p className={styles.errors}>{errors.email.message}</p>
            }
            <label htmlFor="password" className={styles.field}>
                <MdLock className={styles.inputIcon}/>
                <input type="password" className={styles.inputField} placeholder="Password"
                       {...register('password',
                           {
                               required: {
                                   value: true,
                                   message: 'Password is required'
                               },
                           })}
                />
            </label>
            {
                errors.password && <p className={styles.errors}>{errors.password.message}</p>
            }
            <div className={styles.actionButtons}>
                <div>
                    <button className={styles.button1}>
                        Iniciar Sesión
                    </button>
                    <Link href='/auth/register' className={styles.button2}>Registrarse</Link>
                </div>
                <button className={styles.button3}>Olvidó su Contraseña ?</button>
            </div>
        </form>
    );
};

export default LoginPage
