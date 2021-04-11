import *as axios from "axios"

const instance = axios.create({
    baseURL: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
                  'Content-Type': 'application/JSON',
            }
})

export const setMovies = () => {
     
    return instance.get(``)

    
}