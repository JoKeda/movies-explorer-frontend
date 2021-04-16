import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {

const [count, setCount] = useState(4)
const [increment,setIncrement]=useState(4)    

    
    
const changeMoviesList = (movie1=[], movie2=[]) => {
        if (props.checkboxChecked == false) {
            return movie1
            console.log(movie1)
        }
        return movie2
        console.log(movie2)
    }
    
    const movie = changeMoviesList(props.longFilteredMovies, props.shortFilteredMovies)
    const saveMovie = changeMoviesList(props.longSaveMovies, props.shortSaveMovies)
    const searchSaveMovie=changeMoviesList(props.longSaveFilteredMovies,props.shortSaveFilteredMovies)
    


    
const addCount = () => {
    setCount(count + increment)
    
    }



   ///////////////////var2/////
const cardsCountChange = () => {
    if (window.screen.width<768 && window.screen.width>480) {
            setCount(8)
            setIncrement(2)
        } else if (window.screen.width<=480 && window.screen.width>320) {
            setCount(5)
            setIncrement(2)
        } else if(window.screen.width>768 && window.screen.width<=1280){
            setCount(3)
            setIncrement(3)
    }      else if(window.screen.width>=1280 && window.screen.width<1920){
            setCount(4)
            setIncrement(4)
        } 
    else {
        
        }
}

useEffect(() => {
    cardsCountChange()
},[])
    
    
useEffect(() => {
        window.addEventListener('resize',
        cardsCountChange
    )
    return () => window.removeEventListener('resize',cardsCountChange)
})
 



    


    

    return (
        <Switch>
            <Route path="/movies">
                <section className="movies-card-list">

                    {(props.searchValue === "" && props.error !== "") && <div className="error">{props.notification}</div>}
                    
                    {((!movie.length&&props.error===""&&props.searchValue))?<div className="error">Ничего не найдено</div>:""}
                    <div className="movies-card-list__content">
                     
                        <MoviesCard
                            movie={movie}
                            saveMovie={(props.searchValue) ? searchSaveMovie : saveMovie}
                            count={count}
                            shortFilteredMovies={props.shortFilteredMovies}
                            longFilteredMovies={props.longFilteredMovies}
                            checkboxChecked={props.checkboxChecked}
                            toggleMovieSave={props.toggleMovieSave}
                            deleteOwnMovie={props.deleteOwnMovie}
                            isAdd={props.isAdd}
                            setIsAdd={props.setIsAdd}
                            removeMovie={props.removeMovie}
                        />
                    </div>
                        
                       <div className="movies-card-list__block-more">
                        {((movie)?( (movie.length) && (movie.length > count)):"")?
                        <button onClick={addCount} className="movies-card-list__block-more-movies">Ещё</button> :null}
                    </div>
                </section>
            </Route>
















            <Route path="/saved-movies">
                <section className="movies-card-list">
                                        {(props.searchValue === "" && props.error !== "") && <div className="error">{props.notification}</div>}
                      
                    <div className="movies-card-list__content">
                    
                    {((!searchSaveMovie.length&&props.error===""&&props.searchValue))?<div className="error">Ничего не найдено</div>:""}
                        
                            <MoviesCard
                                movie={movie}
                                count={props.count}
                                shortSaveMovies={props.shortSaveFilteredMovies}
                                longSaveMovies={props.longSaveFilteredMovies}
                                saveMovie={(props.searchValue) ? searchSaveMovie : saveMovie}
                                allSaveMovies={props.allSaveMovies}
                                checkboxChecked={props.checkboxChecked}
                                reset={props.reset}
                            />
                    </div>
                     <div className="movies-card-list__block-more">
                  
                 
                        {((saveMovie)?( (saveMovie.length > 0) && (saveMovie.length > count)):"")?
                        <button onClick={addCount} className="movies-card-list__block-more-movies">Ещё</button> :null}
                    </div>
                </section>
            </Route>
        </Switch>
    );
}

export default MoviesCardList;
