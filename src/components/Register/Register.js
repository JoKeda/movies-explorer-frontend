import React from 'react';
import {Link} from 'react-router-dom';

import projectLogo from '../../images/header-logo.svg';
import Input from "../Input/Input";

import './Register.css';

function Register() {
    return (
        <div className="register">
            <div className="register__section">
                <img className="register__logo" src={projectLogo} alt="Логотип"/>
                <form className="register__form">
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <Input
                        label="Имя"
                        type="text"
                        placeholder="Виталий"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span id="register-input-error" className="register__input-error" />
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="pochta@yandex.ru"
                        autoComplete="none"
                        pattern="^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$"
                        required
                    />
                    <span id="register-input-error" className="register__input-error" />
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
                    <span id="register-input-error" className="register__input-error" />
                    <button type="submit" className="register__submit-button">Зарегистрироваться</button>
                    <div className="register__task">
                        <p className="register__task-text">Уже зарегистрированы?</p>
                        <Link to="/signin" className="register__signin-link">Войти</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
