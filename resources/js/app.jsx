import './bootstrap';
import '../css/app.css';
import React from "react";
import { createRoot } from 'react-dom/client';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";





const App = () => {
    return (
        <>
            <Routes>
                <Route index element={<Login />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* <Route path="*" element={<NoMatch />} /> */}
            </Routes>
        </>
    );
};

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//     },
//     {
//         path: "sign-up",
//         element: <Register />,
//     },
// ]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
