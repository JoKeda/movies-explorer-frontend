import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';


function Movies(props) {

    return (
        <div className="movies">
            <SearchForm
                allMovies={props.allMovies}
                moviesData={props.moviesData}
                notification={props.notification}/>
        </div>
    );
}

export default Movies;
