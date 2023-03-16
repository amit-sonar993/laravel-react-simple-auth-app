import ApplicationLogo from '@/Components/ApplicationLogo';
import { useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Guest({ children }) {
    const auth = useSelector((state) => state.auth.data)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.hasOwnProperty('token')) {
            console.log('auth', location)
            let from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [auth])

    return (
        (!auth.hasOwnProperty('token')) ?
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
        : ''
    );
}
