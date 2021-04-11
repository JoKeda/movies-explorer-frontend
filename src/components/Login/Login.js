import React, { useContext, useState } from 'react';
import { connectAdvanced } from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import projectLogo from '../../images/header-logo.svg';
import { signIn } from '../../utils/MainApi';
import Input from "../Input/Input";
import {Context}  from "../../context/Context"
import './Login.css';
import Preloader from '../Preloader/Preloader';

function Login(props) {
    const [isFetching,setIsFetching]=useState(false)
    const [logined, setLogined] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [emailDirty, setEmailDirty] = React.useState(false);
    const [passwordDirty, setPasswordDirty] = React.useState(false);
    const [emailError, setEmailError] = React.useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = React.useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = React.useState(false);
    const history = useHistory()

    if(props.isAuth) history.push('/movies')

const handleEmail = (e) => {
        setEmail(e.target.value)
        const regExpEmail = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e.target.value);

        if (!regExpEmail) {
            setEmailError('Некорректный email');
            console.log(emailError)
        
        } else {
            setEmailError('');
        }
    }


    const handlePassword = (e) => {
        setPassword(e.target.value)
        const regExpPassword = /^\S*$/.test(e.target.value);

        if (!regExpPassword) {
        
            setPasswordError('Не допускается использование пробелов при создании пароля');
        } else if (e.target.value.length < 8) {
            setPasswordError('Минимальная длина пароля 8 символов');
         
               
        } else {
            setPasswordError('');
        }
    }

    React.useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);




    const handleBlur = (e) => {
     
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
               
                break;

            case 'password':
               
                setPasswordDirty(true);
                break;

            default:
                console.log('Ошибка в blurHandler');
                break;
        }
    }








        const keys = { email, password }





     const handleCklick = async (e) => {
         e.preventDefault()
        setIsFetching(true)
            try {
                const response = await signIn(keys)
               
                if (response.status == 200) {
                    localStorage.setItem("token", response.data.token)
                    props.setLogined(true)
                    props.setIsAuth(true)
                    
                    history.push('/movies')
                    
                    
                }
           
            }
            catch (e) {
                setError('Произошла ошибка при попытке авторизоваться')
            }
         setIsFetching(false)
        }
    
    if (isFetching) {
            return <Preloader/>
        }

        return (
            <div className="login">
             
                <div className="login__section">
                    <img className="login__logo" src={projectLogo} alt="Логотип" />
                    <form className="login__form" onSubmit={handleCklick}>
                        <h1 className="login__title">Рады видеть!</h1>
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="pochta@yandex.ru"
                            autoComplete="none"
                            pattern="^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$"
                            required
                            change={handleEmail}
                            onblur={handleBlur}
                            name={"email"}
                        />
                        <span id="login-input-error" className="login__input-error" />
                      
                        {(emailDirty==true && emailError) && <span>{emailError}</span>}
                        <Input
                            label="Пароль"
                            type="password"
                            placeholder="Введите пароль"
                            autoComplete="none"
                            minLength="8"
                            maxLength="30"
                            pattern="^\S*$"
                            title="Не допускается использование пробела в пароле"
                            required
                            change={handlePassword}
                            onblur={handleBlur}
                            name={"password"}
                        />
                             { (passwordDirty==true && passwordError)&&<span>{passwordError}</span>}
                      
                        <span id="login-input-error" className="login__input-error" />
                        <div className="error">{error}</div>
                        <button type="submit" className="login__submit-button" disabled={!formValid}>Войти</button>
                        <div className="login__task">
                            <p className="login__task-text">Ещё не зарегистрированы?</p>
                            <Link to="/signup" className="login__signup-link">Регистрация</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

export default Login
