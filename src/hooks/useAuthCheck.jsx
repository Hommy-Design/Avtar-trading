import { toast } from "react-toastify";


const useAuthCheck = () => {


    const isAuthenticated = false

    const validateLogin = () => {
        if(!isAuthenticated)
        {
            toast.error("you must be logged in", {position: "top-right"})
            return false
        } else return true
    }
  return (
    {
        validateLogin
    }
  )
}

export default useAuthCheck