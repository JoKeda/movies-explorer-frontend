import {Route, useHistory} from 'react-router-dom';
import React, {useLayoutEffect} from "react"
import mainApi from "../../utils/MainApi";


const ProtectedRoute = ({ component: Component, isAuth, setAuth, ...rest }) => {
    const history = useHistory();
    useLayoutEffect(()=>{
        if(!isAuth && localStorage.getItem('token')) {
            ( () => {
                mainApi.getUserData(localStorage.getItem('token'))
                    .then(res => {
                        if(res?.email){
                            setAuth(true)
                        }else {
                            history.push('/')
                        }

                    })

            })()
        }else if(!localStorage.getItem('token')){
            history.push('/')
        }
    },[])
    return(
        <Route {...rest}>
            <Component/>
        </Route>
    )
}





export default ProtectedRoute