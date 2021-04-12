import React, {useEffect, useState} from "react"
import {getUserData} from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";



const AuthRoutesContainer = ({children,isAuth,setAuth}) => {
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        if(!isAuth && localStorage.getItem('token')) {
            setLoading(true);
            (async () => {
                const userData = await getUserData();
               
                if(userData?.data?.email){
                    setAuth(true)
                }
                setLoading(false)
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