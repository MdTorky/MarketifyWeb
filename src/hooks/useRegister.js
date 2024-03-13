import { useState } from 'react';
import { useAuthContext } from './useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useRegister = (api) => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const register = async ({ userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError }) => {
        // const register = async ({ userEmail, userFname, userPassword, userPhoneNo, userPassport, userStatus, userType }) => {

        setLoading(true)
        setError(null)


        const response = await fetch(`${api}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError })
            // body: JSON.stringify({ userEmail, userFname, userPassword, userPhoneNo, userPassport, userStatus, userType })
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //Save the user to local storage

            localStorage.setItem('user', JSON.stringify(json))

            //Update Auth Context

            dispatch({ type: "LOGIN", payload: json })
            setLoading(false)
            toast.success("Account Created Successfully", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return { register, loading, error }
}