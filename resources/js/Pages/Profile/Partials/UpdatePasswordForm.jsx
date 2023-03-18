import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { profileSubmitPasswordUpdate } from '@/store/actions/profile';
import { toast } from 'react-toastify';

const schema = yup.object({
    current_password: yup.string().required(),
    password: yup.string().required(),
    password_confirmation: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match")
}).required();

export default function UpdatePasswordForm({ className }) {
    const [submitting, setSubmitting] = useState(false)
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const dispatch = useDispatch()
    const { register, setError, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const updatePassword = async (data) => {
        setSubmitting(true)
        const { payload } = await dispatch(profileSubmitPasswordUpdate(data))
        setSubmitting(false)

        /* setting backend errors */
        if (payload.hasOwnProperty('errors')) {
            let backendErrors = payload.errors
            for (const key in backendErrors) {
                setError(key, { message: backendErrors[key] })
            }
        }

        if (payload.success) {
            reset()
            toast.success("Password updated Successfully !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={handleSubmit(updatePassword)} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        {...register('current_password')}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password?.message} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        {...register('password')}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password?.message} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        {...register('password_confirmation')}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation?.message} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={submitting}>Save</PrimaryButton>

                    <Transition
                        show={false}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
