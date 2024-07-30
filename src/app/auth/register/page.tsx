'use client';

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import styles from './Register.module.css';

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
        <form onSubmit={onSubmit} className={styles.form}>
            <p className={styles.heading}>Registro</p>
            <label htmlFor="name" className={styles.field}>
                <input type="text" className={styles.inputField} placeholder='Nombre'
                       {...register('name',
                           {
                               required: {
                                   value: true,
                                   message: 'El nombre es requerido'
                               }
                           })}
                />
            </label>
            {errors.name && (
                <span className={styles.errors}>{errors.name.message}</span>
            )}
            <label htmlFor="" className={styles.field}>
                <input type="email" className={styles.inputField} placeholder={'Email'}
                       {...register('email',
                           {
                               required: {
                                   value: true,
                                   message: 'El email es requerido'
                               }
                           })}
                />
            </label>
            {errors.email && (
                <span className={styles.errors}>{errors.email.message}</span>
            )}
            <label htmlFor="" className={styles.field}>
                <input type="password" className={styles.inputField} placeholder={'Contraseña'}
                       {...register('password',
                           {
                               required: {
                                   value: true,
                                   message: 'La contraseña es requerida'
                               }
                           })}
                />
            </label>

            {errors.password && (
                <span className={styles.errors}>{errors.password.message}</span>
            )}
            <label htmlFor="" className={styles.field}>
                <input type="passwordConfirm"  className={styles.inputField} placeholder={'Confirmar Contraseña'}
                       {...register('passwordConfirm',
                           {
                               required: {
                                   value: true,
                                   message: 'Debe confirmar la contraseña'
                               }
                           })}
                />
            </label>
            {errors.passwordConfirm && (
                <span className={styles.errors}>{errors.passwordConfirm.message}</span>
            )}
            <button className={styles.button1}>
                Registrarse
            </button>
        </form>
    );
};

export default RegisterPage
