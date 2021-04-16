import React, { useRef, useState } from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {signUp} from "../../utils/MainApi"
import projectLogo from '../../images/header-logo.svg';
import Input from "../Input/Input";
import {connect} from "react-redux"
import './Register.css';
import Preloader from '../Preloader/Preloader';


function Register(props) {
    const [name, setName] = useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error, setError] = useState("")
    const [emailDirty, setEmailDirty] = React.useState(false);
    const [passwordDirty, setPasswordDirty] = React.useState(false);
    const [nameDirty, setNameDirty] = React.useState(false);
    const [emailError, setEmailError] = React.useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = React.useState('Пароль не может быть пустым');
    const [nameError, setNameError] = React.useState('Имя не может быть пустым');
    const [formValid, setFormValid] = React.useState(false)
    const [isFetching,setIsFetching]=useState(false)
    const history = useHistory()



    

if(props.isAuth) history.push('/')

     function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
           
                break;

            case 'password':
                setPasswordDirty(true);
                 
                break;
         
            
            case 'name':
                setNameDirty(true);
             
                break;
     

            default:
                console.log('Ошибка в blurHandler');
                break;
        }
    }










    const handleName = (e) => {
        setName(e.target.value)
        const regExpEngName = /^[?!,.\-a-zA-Z0-9\s]+$/.test(e.target.value);

        if (e.target.value.length < 2 || e.target.value.length > 30) {
            setNameError('Длина имени должна составлять от 2 до 30 символов');
        } else if (!regExpEngName) {
            setNameError('Имя должно быть указано латиницей');
        } else {
            setNameError('');
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
    const handleEmail = (e) => {
        setEmail(e.target.value)
        const regExpEmail = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e.target.value);

        if (!regExpEmail) {
            setEmailError('Некорректный email');
        } else {
            setEmailError('');
        }
        
    }


      React.useEffect(() => {
        if (emailError || passwordError || nameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError, nameError]);

const keys = { name, email, password }
        
    const handleCklick = (e) => {
        e.preventDefault()
        props.handleRegister(keys)
}
    if (isFetching) {
            return <Preloader/>
        }
    return (
        <div className="register">
        
            <div className="register__section">
               <Link to="/"><img className="register__logo" src={projectLogo} alt="Логотип"/></Link> 
                <form className="register__form" onSubmit={handleCklick}>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <Input
                        label="Имя"
                        type="text"
                        placeholder="Виталий"
                        minLength="2"
                        maxLength="30"
                        required
                        change={handleName}
                        name={"name"}
                        onblur={blurHandler}
                       
                    />
                    <span id="register-input-error" className="register__input-error" />
                    {(nameDirty && nameError) && <span >{nameError}</span>}
                    {/* <span>{nameDirty}</span>
                    <span>{ nameError}</span> */}
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="pochta@yandex.ru"
                        autoComplete="none"
                        pattern="^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$"
                        required
                        change={handleEmail}
                        name={"email"}
                        onblur={blurHandler}
                    />
                    <span id="register-input-error" className="register__input-error" />
                    {(emailDirty && emailError) && <span>{emailError}</span>}
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
                        name={"password"}
                        onblur={blurHandler}
                    />
                    <span id="register-input-error" className="register__input-error" />
                    {(passwordDirty && passwordError) && <span>{passwordError}</span>}
                        <div className="error">{props.error}</div>
                    <button type="submit" className={!isFetching?"register__submit-button":"disabledButton"} disabled={!formValid||props.isFetching}>Зарегистрироваться</button>
                    <div className="register__task">
                        <p className="register__task-text">Уже зарегистрированы?</p>
                        <Link to="/signin" className="register__signin-link">Войти</Link>
                    </div>
                </form>
            
            </div>
        </div>
    );
}


export default Register
