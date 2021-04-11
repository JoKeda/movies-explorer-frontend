import React, { useContext, useEffect } from 'react';
import {Context} from "../../context/Context"
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { useHistory } from 'react-router';
import { Redirect } from "react-router-dom"










function Movies(props) {

const {isAuth,setIsAuth}=useContext(Context)
    const history = useHistory()
    return (
        <div className="movies">
           <SearchForm />
        </div>
    );
}

export default Movies;
