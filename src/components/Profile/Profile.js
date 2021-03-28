import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <div className="profile">
            <div className="profile__user-data-container">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <form className="profile__form">
                    <div className="profile__user-name-email-container profile__user-name-email-container_type_first">
                        <p className="profile__user-data">Имя</p>
                        <input
                            type="text"
                            className="profile__input"
                            defaultValue="Виталий"
                        />
                    </div>
                    <div className="profile__user-name-email-container profile__user-name-email-container_type_second">
                        <p className="profile__user-data">Почта</p>
                        <input
                            type="text"
                            className="profile__input"
                            defaultValue="pochta@yandex.ru"
                        />
                    </div>
                </form>
            </div>
            <div className="profile__buttons-container">
                <button type="button" className="profile__button profile__button_type_edit">Редактировать</button>
                <button type="button" className="profile__button profile__button_type_logout">Выйти из аккаунта</button>
            </div>
        </div>
    );
}

export default Profile;
