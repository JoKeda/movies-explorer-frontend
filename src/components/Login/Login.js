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
import e from 'cors';

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

    if(props.isAuth) history.push('/')

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


const handleSubmit = (e) => {
    e.preventDefault()
    props.handleCklick(keys)
}
        return (
            <div className="login">
             
                <div className="login__section">
                   <Link to="/"><img className="login__logo" src={projectLogo} alt="Логотип" /></Link> 
                    <form className="login__form" onSubmit={handleSubmit}>
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
                        <div className="error">{props.error}</div>
                        <button type="submit"  className="login__submit-button" disabled={!formValid}>Войти</button>
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
