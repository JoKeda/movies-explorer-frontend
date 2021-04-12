import React, { useEffect, useState } from "react"
import "./MovieItem.css"
import { getMovies, saveMovie,deleteMovies } from "../../utils/MainApi"
import likeIconLiked from '../../images/like-icon-liked.svg';
import likeIconUnLiked from '../../images/like-icon-unliked.svg';
import deleteButtonIcon from '../../images/delete-icon.svg';
import e from "cors";
const apiUrl = 'https://api.nomoreparties.co'

const MovieItem = (props) => {




    
    const handleClick = (movie, id) => {
        
   
        
    if ((!props.id)) {
        props.toggleMovieSave(movie,id)
        
    } else {
    
        props.removeMovie(id)
   
    }
}
 




   


                    
                    return  <>
                            <figure className="movies-card" key={props.key}>
                               <a target="_blank" href={props.href}> <img className="movies-card__image" src={props.id?props.movie.image:(props.src)?props.src:props.movie.image} /></a>
                            <figcaption className="movies-card__description">
                                <p className="movies-card__text">{props.movie.nameRU}</p>

                                {
                                    props.hasSaveMovie ? <img src={deleteButtonIcon} className="movies-card__like-icon" alt="like icon" movie={props.movie} onClick={()=>{props.reset(props.id)}}/>:
                                   ((props.id) ? <img src={likeIconLiked} className="movies-card__like-icon" alt="like icon" movie={props.movie} onClick={() => {handleClick(props.movie,props.id) }} /> :
                                            <img src={likeIconUnLiked} className="movies-card__like-icon" alt="like icon" movie={props.movie} onClick={() => {handleClick(props.movie,props.id,e) }} />)
                                        
                                }
                             
                            </figcaption>
                            <p className="movies-card__time">{props.duration}</p>
                        </figure>
                        </>
                    
}

export default MovieItem