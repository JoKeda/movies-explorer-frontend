import React, { useState, useEffect, useRef } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {connect} from "react-redux"
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
import MovieItem from "../MovieItem/MovieItem"
import {deleteMovies} from "../../utils/MainApi"
import { apiUrl } from "../../configs/config"
import './MoviesCard.css';
import { getMovies, saveMovie } from '../../utils/MainApi';
import { setMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import Modal from '../Modal/Modal';

// const apiUrl = 'https://api.nomoreparties.co'





function MoviesCard(props) {

    const [isFetching,setIsFetching]=useState(false)
    const [hasSaveMovie,setHasSaveMovie]=useState(true)
    

    if (isFetching) {
    return <Preloader/>
    }

    return (
        <>
       
            <Switch>



                <Route path="/movies">
   
              {((props.movie)?(props.movie):[]).slice(0,props.count).map(item =>

                       {
                  return <MovieItem
                              
                               key={item.id}
                               movie={item}
                               duration={`${Math.floor(item.duration / 60)}ч ${item.duration % 60}м`}
                               src={`${apiUrl}${item.image ? item.image.url :null}`}
                               href={item.trailerLink}
                               toggleMovieSave={props.toggleMovieSave}
                               id={item._id}
                               reset={props.reset}
                               shortId={item.id}
                               removeMovie={props.removeMovie}
                               isAdd={props.isAdd}
                               
                               
                           />
                     })}
                </Route>



                



                <Route path="/saved-movies">
            
                


              {((props.saveMovie)?(props.saveMovie):[]).slice(0,props.count).map(item =>

                       {
                           return <MovieItem
                               key={item.id}
                               movie={item}
                               duration={`${Math.floor(item.duration / 60)}ч ${item.duration % 60}м`}
                               src={item.image?item.image.url:item.image}
                               hasSaveMovie={hasSaveMovie}
                               id={item._id}
                               href={item.trailer}
                               reset={props.reset}

                           />
              })}
                  
                </Route>
            </Switch>
       
        </>
    )
}


export default MoviesCard

