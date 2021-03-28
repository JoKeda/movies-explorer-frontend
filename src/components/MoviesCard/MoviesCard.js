import React from 'react';
import {Route, Switch} from 'react-router-dom'

import filmOne from '../../images/screen1.png';
import filmTwo from '../../images/screen2.png';
import filmThree from '../../images/screen3.png';
import filmFour from '../../images/screen4.png';
import filmFive from '../../images/screen5.png';
import filmSix from '../../images/screen6.png';
import filmSeven from '../../images/screen7.png';
import filmEight from '../../images/screen8.png';
import filmNine from '../../images/screen9.png';
import filmTen from '../../images/screen10.png';
import filmEleven from '../../images/screen11.png';
import filmTwelve from '../../images/screen12.png';
import likeIconLiked from '../../images/like-icon-liked.svg';
import likeIconUnLiked from '../../images/like-icon-unliked.svg';
import deleteButtonIcon from '../../images/delete-icon.svg';

import './MoviesCard.css';

function MoviesCard() {
    const moviesList = [
        {id: 1, src: filmOne, description: "33 слова о дизайне", duration: "1ч 17м", likeIcon: likeIconLiked},
        {id: 2, src: filmTwo, description: "Киноальманах «100 лет дизайна»", duration: "1ч 3м", likeIcon: likeIconUnLiked},
        {id: 3, src: filmThree, description: "В погоне за Бенкси", duration: "1ч 42м", likeIcon: likeIconUnLiked},
        {id: 4, src: filmFour, description: "Баския: Взрыв реальности", duration: "1ч 21м", likeIcon: likeIconUnLiked},
        {id: 5, src: filmFive, description: "Бег это свобода", duration: "1ч 44м", likeIcon: likeIconUnLiked},
        {id: 6, src: filmSix, description: "Книготорговцы", duration: "1ч 37м", likeIcon: likeIconUnLiked},
        {id: 7, src: filmSeven, description: "Когда я думаю о Германии ночью", duration: "1ч 56м", likeIcon: likeIconUnLiked},
        {id: 8, src: filmEight, description: "Gimme Danger: История Игги и The Stooge...", duration: "1ч 59м", likeIcon: likeIconUnLiked},
        {id: 9, src: filmNine, description: "Дженис: Маленькая девочка грустит", duration: "1ч 42м", likeIcon: likeIconLiked},
        {id: 10, src: filmTen, description: "Соберись перед прыжком", duration: "1ч 10м", likeIcon: likeIconLiked},
        {id: 11, src: filmEleven, description: "Пи Джей Харви: A dog called money", duration: "1ч 4м", likeIcon: likeIconUnLiked},
        {id: 12, src: filmTwelve, description: "По волнам: Искусство звука в кино", duration: "1ч 7м", likeIcon: likeIconUnLiked},
    ];

    const savedMoviesList = [
        {id: 1, src: filmOne, description: "33 слова о дизайне", duration: "1ч 17м"},
        {id: 2, src: filmTwo, description: "Киноальманах «100 лет дизайна»", duration: "1ч 3м", deleteIcon: deleteButtonIcon},
        {id: 3, src: filmThree, description: "В погоне за Бенкси", duration: "1ч 42м"},
    ]
    return (
        <>
            <Switch>
                <Route path="/movies">
                    {moviesList.map((item, idx) =>
                        <figure className="movies-card" key={item.id}>
                            <img className="movies-card__image" src={item.src} alt={item.description}/>
                            <figcaption className="movies-card__description">
                                <p className="movies-card__text">{item.description}</p>
                                <img src={item.likeIcon} className="movies-card__like-icon" alt="like icon"/>
                            </figcaption>
                            <p className="movies-card__time">{item.duration}</p>
                        </figure>
                    )}
                </Route>
                <Route path="/saved-movies">
                    {savedMoviesList.map((item) => (
                        <figure className="movies-card" key={item.id}>
                            <img className="movies-card__image" src={item.src} alt={item.description}/>
                            <figcaption className="movies-card__description">
                                <p className="movies-card__text">{item.description}</p>
                                <img src={item.deleteIcon} className="movies-card__delete-button" />
                            </figcaption>
                            <p className="movies-card__time">{item.duration}</p>
                        </figure>
                    ))}
                </Route>
            </Switch>
        </>
    );
}

export default MoviesCard;
