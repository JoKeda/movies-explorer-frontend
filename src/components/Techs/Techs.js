import React from 'react';
import './Techs.css';

function Techs() {
    const techItems = [
        {id: 1, subject: "HTML"},
        {id: 2, subject: "CSS"},
        {id: 3, subject: "JS"},
        {id: 4, subject: "React"},
        {id: 5, subject: "Git"},
        {id: 6, subject: "Express.js"},
        {id: 7, subject: "mongoDB"},
    ];

    return (
        <section id="techs-id" className="techs">
            <h2 className="techs__content-title">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__title">
                    7 технологий
                </h3>
                <p className="techs__text">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className="techs__list">
                    {techItems?.map((item) => (
                        <li key={item?.id}>
                            <p className="techs__item">{item.subject}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Techs;
