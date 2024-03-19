import { useAuthContext } from "./useAuthContext"
import { useItemsContext } from "./useItemsContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: itemsDispatch } = useItemsContext()

    const logout = () => {
        localStorage.removeItem('user')


        dispatch({
            type: 'LOGOUT',
        })
        itemsDispatch({
            type: 'SET_ITEM',
            payload: null
        })
        toast.success("Logout Successfully", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        // alert("Logged Out")
    }

    return { logout }

}

