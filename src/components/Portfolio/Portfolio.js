import React from 'react';

import portfolioLinkIcon from '../../images/portfolio-link-icon.svg';

import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li>
                    <a href="https://github.com/JoKeda/how-to-learn" className="portfolio__list-section"
                       target="_blank" rel="noreferrer">
                        <p className="portfolio__list-work">Статичный сайт</p>
                        <img className="portfolio__list-icon" src={portfolioLinkIcon} alt="Сылка на работу"/>
                    </a>
                </li>
                <span className="portfolio__line"/>
                <li>
                    <a href="https://jokeda.github.io/russian-travel" className="portfolio__list-section"
                       target="_blank" rel="noreferrer">
                        <p className="portfolio__list-work">Адаптивный сайт</p>
                        <img className="portfolio__list-icon" src={portfolioLinkIcon} alt="Сылка на работу"/>
                    </a>
                </li>
                <span className="portfolio__line"/>
                <li>
                    <a href="https://jokeda.students.nomoredomains.icu" className="portfolio__list-section"
                       target="_blank" rel="noreferrer">
                        <p className="portfolio__list-work">Одностраничное приложение</p>
                        <img className="portfolio__list-icon" src={portfolioLinkIcon} alt="Сылка на работу"/>
                    </a>
                </li>
            </ul>

        </section>
    );
}

export default Portfolio;
