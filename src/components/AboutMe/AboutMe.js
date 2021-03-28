import React from 'react';
import myPhoto from '../../images/my-photo.png';
import './AboutMe.css';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__section">
                <article className="about-me__text">
                    <h3 className="about-me__name">Евгений</h3>
                    <p className="about-me__profession">Фронтенд-разработчик, 29 лет</p>
                    <p className="about-me__description">Я родился и живу в Санкт-Петербурге, закончил факультет промышленного и гражданского строительства. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «ICA». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <ul className="about-me__social-links">
                        <li><a href="https://www.facebook.com/eugen.gaiduk.7" className="about-me__link" target="_blank" rel="noreferrer">Facebook</a></li>
                        <li><a href="https://github.com/JoKeda" className="about-me__link" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </article>
                <img className="about-me__my-photo" src={myPhoto} alt="Моё фото" />
            </div>
        </section>
    );
}

export default AboutMe;
