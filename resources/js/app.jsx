import './bootstrap';
import '../css/app.css';
import React, { useEffect, useLayoutEffect } from "react";
import { createRoot } from 'react-dom/client';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import store from './store'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { setAuthData } from './store/actions/auth';
import Dashboard from './Pages/Dashboard';
import Edit from '@/Pages/Profile/Edit'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const authData = localStorage.getItem('auth-user')

        dispatch(setAuthData(authData))
    },[])

    return (
        <>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Edit/>} />

                {/* <Route path="*" element={<NoMatch />} /> */}
            </Routes>
        </>
    );
};

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
