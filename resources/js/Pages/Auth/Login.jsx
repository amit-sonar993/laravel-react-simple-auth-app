import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
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
import {authSubmitLogin} from '@/store/actions/auth'

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
}).required();


export default function Login({ status, canResetPassword }) {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        dispatch(authSubmitLogin(data))
        console.log(data)
    }


    return (
        <GuestLayout>
            {/* <Head title="Log in" /> */}



            {/* {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>} */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        {...register("email")}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
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
                        autoComplete="current-password"
                    />

                    <InputError message={errors.password?.message} className="mt-2" />
                </div>

                {/* <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            {...register("remember")}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div> */}

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}


                    <PrimaryButton className="ml-4"
                    // disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <div className="p-6 text-center">

                <>
                    <p className="mb-2">Don't have a account ?</p>
                    <Link
                        to="/register"
                        className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Register
                    </Link>
                </>

            </div>
        </GuestLayout>
    );
}
