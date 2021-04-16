import React, {useEffect, useState} from "react"
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";



const AuthRoutesContainer = ({children,isAuth,setAuth}) => {
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
    if(!isAuth && localStorage.getItem('token')) {
            setLoading(true);
            ( () => {
              mainApi.getUserData(localStorage.getItem('token'))
                  .then(res => {
                if(res?.email){
                    setAuth(true)
                }
                setLoading(false)
               })

            })()
        }
    },[])
    return(
        <>
            {loading ? (<Preloader/>) : children}
        </>
    )
}
export default AuthRoutesContainer