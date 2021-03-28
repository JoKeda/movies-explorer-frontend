import React from 'react';
import {Link} from 'react-router-dom';

import projectLogo from '../../images/header-logo.svg';
import Input from "../Input/Input";

import './Login.css';

function Login() {
    return (
        <div className="login">
            <div className="login__section">
                <img className="login__logo" src={projectLogo} alt="Логотип"/>
                <form className="login__form">
                    <h1 className="login__title">Рады видеть!</h1>
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="pochta@yandex.ru"
                        autoComplete="none"
                        pattern="^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$"
                        required
                    />
                    <span id="login-input-error" className="login__input-error" />
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
                    />
                    <span id="login-input-error" className="login__input-error" />
                    <button type="submit" className="login__submit-button">Войти</button>
                    <div className="login__task">
                        <p className="login__task-text">Ещё не зарегистрированы?</p>
                        <Link to="/signup" className="login__signup-link">Регистрация</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
