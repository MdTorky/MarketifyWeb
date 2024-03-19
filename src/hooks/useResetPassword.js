import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
export const useResetPassword = (api) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const resetPassword = async ({ userPassword, id }) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${api}/api/user/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, userPassword })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
            toast.success("Password Changed Successfully", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/SignIn")
        }
    }

    return { resetPassword, isLoading, error }
}