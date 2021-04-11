import React  from 'react';
import {useContext} from "react"
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {Context} from "../../context/Context"
import './SavedMovies.css';
import { useHistory } from 'react-router'











function SavedMovies(props) {
    const { isAuth, setIsAuth } = useContext(Context)
    const history = useHistory()
      if (!props.isAuth) {
        history.push("/")
    }
 
    return (
        <div className="saved-movies">
            <div>{isAuth}</div>
            <SearchForm />
            <MoviesCardList />
        </div>
    );
}

export default SavedMovies;
