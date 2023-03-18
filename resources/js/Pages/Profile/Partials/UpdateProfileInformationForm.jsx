import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSubmitUpadate } from '@/store/actions/profile'
import { toast } from 'react-toastify';

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email()
}).required();

export default function UpdateProfileInformation({ className }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const auth = useSelector((state) => state.auth.data)
    const { register, setError, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: auth.user?.name,
            email: auth.user?.email
        }
    })
    const dispatch = useDispatch()


    const submit = async (data) => {
        setIsSubmitting(true)
        const { payload } = await dispatch(profileSubmitUpadate(data))
        setIsSubmitting(false)

        /* setting backend errors */
        if (payload.hasOwnProperty('errors')) {
            let backendErrors = payload.errors
            for (const key in backendErrors) {
                setError(key, { message: backendErrors[key] })
            }
        }

        if (payload.success) {
            reset()
            toast.success("Profile updated Successfully !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        isFocused
                        autoComplete="name"
                        {...register('name')}
                    />

                    <InputError className="mt-2" message={errors.name?.message} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        autoComplete="username"
                        {...register('email')}
                    />

                    <InputError className="mt-2" message={errors.email?.message} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={isSubmitting}>Save</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
