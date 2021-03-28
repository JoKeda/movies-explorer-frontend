import React from 'react';
import promoLogo from "../../images/promo-logo.png"
import './Promo.css';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            </div>
            <img src={promoLogo} alt="logo" className="promo__logo"/>
        </section>
    );
}

export default Promo;
