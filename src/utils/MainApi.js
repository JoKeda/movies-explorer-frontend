
import *as axios from "axios"


const instance = axios.create({
    baseURL: 'http://diplom-movies.students.nomoredomains.icu',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/JSON',
        
    },
})




export const signUp = (key) => {
    return instance.post(`/signup`,JSON.stringify(key) )  
}

export const signIn = (key) => {
    return instance.post(`/signin`,JSON.stringify(key) )  
}

export const getMovies = () => {
    return instance.get(`/movies`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})  
}

export const deleteMovies = (movieId) => {
    return instance.delete(`/movies/${movieId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})  
}


export const saveMovie = (movie) => {
    return instance.post(`/movies`, JSON.stringify({
        movieId:movie.id,
        country: movie.country ? movie.country : 'Страна не указана',
        director: movie.director ? movie.director : 'Режиссер не указан',
        description: movie.description ? movie.description : 'Описание не указано',
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : 'Год не указан',
        image: movie.image ?  `https://api.nomoreparties.co${movie.image.url}` :null,
        trailer: movie.trailerLink ? movie.trailerLink :  'https://me-mk.students.nomoredomains.monster/not-found',
        thumbnail: `https://api.diplom-film.students.nomoredomains.icu${movie.image.formats.thumbnail ? movie.image.formats.thumbnail.url : ''}` || null,
        nameRU: movie.nameRU ? movie.nameRU : 'Название не указано',
        nameEN: movie.nameEN ? movie.nameEN : 'Название не указано'
    }), { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
}






export const getUserData = () => {
    return instance.get(`/users/me`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
    
}

export const updateUserData = (key) => {
    return instance.patch(`/users/me`,JSON.stringify(key), { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
    
}





