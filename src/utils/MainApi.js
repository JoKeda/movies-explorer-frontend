




// //////////////_


class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

getUserData() {
        const jwt = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(() => {
            return Promise.reject('Произошла ошибка при загрузке данных пользователя');
        });
    }

updateUserData(key) {
        const jwt = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(key)
        })
        .then((res => res.json()))
        .catch(() => {
            return Promise.reject('Произошла ошибка при редактировании данных пользователя');
        });
    }

getMovies() {
        const jwt = localStorage.getItem('token');
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } 
        })
        .catch(() => {
            return Promise.reject('Произошла ошибка при загрузке списка фильмов пользователя');
        });
    }

saveMovie(movie) {
        const jwt = localStorage.getItem('token');
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
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
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(() => {
            return Promise.reject('Произошла ошибка при попытке добавить фильм');
        });
    }

    deleteMovies(movieId) {
        const jwt = localStorage.getItem('token');
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(() => {
            return Promise.reject('Произошла ошибка при попытке удалить фильм');
        });
    }

    signUp(key) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(key)
        })
        .then((res => res.json()))
        .catch(() => {
            return Promise.reject('Произошла ошибка при попытке зарегистрироваться');
        });
    }

    signIn(key) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(key)
        })
        .then((res => res.json()))
        .catch(() => {
            return Promise.reject('Произошла ошибка при попытке авторизоваться');
        });
    }

getUserData(jwt) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(() => {
            return Promise.reject('Произошла ошибка при попытке проверить токен');
        });
    }
}

const mainApi = new MainApi({
    url: 'https://api.diplom-movies.students.nomoredomains.icu',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/JSON',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
});

export default mainApi;
