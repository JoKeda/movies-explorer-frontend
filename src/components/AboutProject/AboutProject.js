import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__two-columns">
                <article className="about-project__content">
                    <h3 className="aabout-project__content-stage">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__content-description">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </article>
                <article className="about-project__content">
                    <h3 className="aabout-project__content-stage">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__content-description">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </article>
            </div>
            <div className="about-project__time-container about-project__time-container_type_first">
                <div className="about-project__time about-project__time_type_backend">
                    <p className="about-project__time-text about-project__time-text_type_black">
                        1 неделя
                    </p>
                </div>
                <div className="about-project__time about-project__time_type_frontend">
                    <p className="about-project__time-text about-project__time-text_type_white">
                        4 недели
                    </p>
                </div>
            </div>
            <div className="about-project__time-container">
                <div className="about-project__time about-project__time_type_backend-description">
                    <p className="about-project__time-text about-project__time-text_type_grey about-project__time-text_type_height">
                        Back-end
                    </p>
                </div>
                <div className="about-project__time about-project__time_type_frontend-description">
                    <p className="about-project__time-text about-project__time-text_type_grey about-project__time-text_type_height">
                        Front-end
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
