import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList() {
    return (
        <Switch>
            <Route path="/movies">
                <section className="movies-card-list">
                    <div className="movies-card-list__content">
                        <MoviesCard />
                    </div>
                    <div className="movies-card-list__block-more">
                        <button className="movies-card-list__block-more-movies">Ещё</button>
                    </div>
                </section>
            </Route>
            <Route path="/saved-movies">
                <section className="movies-card-list">
                    <div className="movies-card-list__content">
                        <MoviesCard />
                    </div>
                </section>
            </Route>
        </Switch>
    );
}

export default MoviesCardList;
