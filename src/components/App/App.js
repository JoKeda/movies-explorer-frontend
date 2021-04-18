import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory, withRouter} from 'react-router-dom';
import {Context} from "../../context/Context"
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile'
import Register from '../Register/Register';
import Login from '../Login/Login';
import Preloader from "../Preloader/Preloader"
import './App.css';
import AuthRoutesContainer from "../AuthRoutesWrapper";
import ProtectedRoute from "./../ProtectedRoute/index"
import mainApi from '../../utils/MainApi';
import moviesApi from "./../../utils/MoviesApi"
function App(props) {

    const [userDataChanged, setUserDataChanged] = useState(false)
    const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState("")
    const history = useHistory()
    const [allMovies, setAllMovies] = useState([])
    const [moviesData, setMoviesData] = useState([])
    const [notification,setNotification]=useState("")
   


   ///////
    useEffect(async() => {
        setIsFetching(true)

    moviesApi.setMovies()
        .then(res => {
            if (res) {
           setMoviesData(res)
            setAllMovies(res)
            setNotification("")  
            } 
        })
            .catch(err => {
          setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
    
    
        setIsFetching(false)
}, [])
///////////




    const handleCklick = (keys) => {

        setIsFetching(true)

        mainApi.signIn(keys)
            .then(response => {
                if (response.token) {
                    localStorage.setItem("token", response.token)
                    setIsAuth(true)
                    setError("")
                    history.push('/movies')
                    setIsFetching(false)
                }
            })
            .catch(err => {
                setError(err)

            })
        setIsFetching(false)
    }


    const handleRegister = (keys) => {
        setIsFetching(true)
        mainApi.signUp(keys)
            .then(response => {
                if (response.email) {
                    mainApi.signIn({email: keys.email, password: keys.password})
                        .then(res => {
                            if (res.token) {
                                localStorage.setItem("token", res.token)
                                setIsAuth(true)
                                history.push('/movies')
                                setError("")
                            }
                        })
                }

            })
            .catch(err => {
                setError(err)

            })
        setIsFetching(false)
    }


    const logOutMe = () => {
        localStorage.clear()
        setIsAuth(false)
        history.push("/")
        setCurrentUser({})
    }


    function handleMobileMenuOpen() {
        toggleMobileMenu(true);
    }

    function handleMobileMenuClose() {
        toggleMobileMenu(false);
    }


    if (isFetching) {
        return <Preloader/>
    }

    return (

        <Context.Provider value={currentUser}>
            <div className="app">
                <div className="app__content">
                    <AuthRoutesContainer isAuth={isAuth} setAuth={setIsAuth}>
                        <Header
                            isOpen={isMobileMenuOpen}
                            onClose={handleMobileMenuClose}
                            onOpenMobileMenu={handleMobileMenuOpen}
                            isAuth={isAuth}
                        />
                        <Switch>
                            <ProtectedRoute isAuth={isAuth} setAuth={setIsAuth} path="/saved-movies"
                                            component={() => (<SavedMovies isAuth={isAuth}/>)}/>
                            <ProtectedRoute setAuth={setIsAuth} isAuth={isAuth} path="/movies"
                                component={() => (<Movies notification={notification} allMovies={allMovies} moviesData={moviesData}/>)}/>
                            <ProtectedRoute setAuth={setIsAuth} isAuth={isAuth} path="/profile"
                                            component={() => (<Profile isAuth={isAuth}

                                                                       setIsAuth={setIsAuth}
                                                                       userDataChanged={userDataChanged}
                                                                       setUserDataChanged={setUserDataChanged}
                                                                       setCurrentUser={setCurrentUser}
                                                                       logOutMe={logOutMe}
                                            />)}/>
                            <Route path="/" exact render={() => <Main isAuth={isAuth}/>}/>
                            <Route path="/signin" render={() => <Login isAuth={isAuth} setIsAuth={setIsAuth}
                                                                       error={error}
                                                                       setError={setError}
                                                                       handleCklick={handleCklick}
                                                                       isFetching={isFetching}

                            />}/>
                            <Route path="/signup"
                                   render={() => <Register isAuth={isAuth} handleRegister={handleRegister} error={error}
                                                           isFetching={isFetching} setError={setError}/>}/>
                            <Route path="*" component={PageNotFound}/>
                        </Switch>
                    </AuthRoutesContainer>

                    <Footer/>
                </div>
            </div>
        </Context.Provider>
    );
}

export default withRouter(App)
