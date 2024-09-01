import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthHook = () => {
  const navigate= useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    if(token){
        if(userType === "vendor"){
            navigate("/vendor/dashboard");
        }
        else if(userType === "customer"){
            navigate("/customer/dashboard");
      }

    }
  
   
  }, [navigate])
  
}

export default useAuthHook