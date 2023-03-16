import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { authSubmitRegister } from '@/store/actions/auth'


const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    password_confirmation: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match")
}).required();

export default function Register() {
    const [submitting, setSubmitting] = useState(false)
    const dispatch = useDispatch()

    const { register, setError, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = async (data) => {
        setSubmitting(true)
        const { payload } = await dispatch(authSubmitRegister(data))
        setSubmitting(false)

        /* setting backend errors */
        if (payload.hasOwnProperty('errors')) {
            let backendErrors = payload.errors
            for (const key in backendErrors) {
                setError(key, { message: backendErrors[key] })
            }
        }

        console.log(payload);
    };

    return (
        <GuestLayout>
            {/* <Head title="Register" /> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        {...register("name")}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                    />

                    <InputError message={errors.name?.message} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        {...register("email")}
                        className="mt-1 block w-full"
                        autoComplete="username"
                    />

                    <InputError message={errors.email?.message} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        {...register("password")}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password?.message} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        {...register("password_confirmation")}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation?.message} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        to="/login"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4"
                        disabled={submitting}
                    >
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
