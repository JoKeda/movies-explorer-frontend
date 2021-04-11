import React, { useEffect, useState } from "react"
import "./MovieItem.css"
import { getMovies, saveMovie,deleteMovies } from "../../utils/MainApi"
import likeIconLiked from '../../images/like-icon-liked.svg';
import likeIconUnLiked from '../../images/like-icon-unliked.svg';
import deleteButtonIcon from '../../images/delete-icon.svg';
import e from "cors";
const apiUrl = 'https://api.nomoreparties.co'

const MovieItem = (props) => {




    
const handleClick = (movie,id=null,shortId) => {
    if ((movie.isAdded=false|| !movie.isAdded) && id===null) {
        props.toggleMovieSave(movie,id,shortId)
        
    } else if(movie,id){
        props.removeMovie(movie,id)
   
    } else {
        console.log("net id")
    }

}
 




   


                    
                    return  <>
                            <figure className="movies-card" key={props.key}>
                               <a target="_blank" href={props.href}> <img className="movies-card__image" src={props.src} /></a>
                            <figcaption className="movies-card__description">
                                <p className="movies-card__text">{props.movie.nameRU}</p>

                                {
                                    props.hasSaveMovie ? <img src={deleteButtonIcon} className="movies-card__like-icon" alt="like icon" movie={props.movie} onClick={()=>{props.reset(props.id)}}/>:
                                   ((props.movie.isAdded && props.id) ? <img src={likeIconLiked} className="movies-card__like-icon" alt="like icon" movie={props.movie} onClick={() => {handleClick(props.movie,props.id,props.shortId) }} /> :
                                            <img src={likeIconUnLiked} className="movies-card__like-icon" alt="like icon" movie={props.movie} onClick={() => {handleClick(props.movie,props.id) }} />)
                                        
                                }
                             
                            </figcaption>
                            <p className="movies-card__time">{props.duration}</p>
                        </figure>
                        </>
                    
}

export default MovieItem