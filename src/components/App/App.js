import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
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
import {getUserData} from "../../utils/MainApi"
import Preloader from "../Preloader/Preloader"
import './App.css';
import AuthRoutesContainer from "../AuthRoutesWrapper";

function App() {
    const [userDataChanged, setUserDataChanged] = useState(false)
    const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [logined, setLogined] = useState(false)

    function handleMobileMenuOpen() {
        toggleMobileMenu(true);
    }

    function handleMobileMenuClose() {
        toggleMobileMenu(false);
    }

    useEffect(() => {
        const tkn = localStorage.getItem('token')
        if (logined && tkn) {
            try {
                getUserData()
                    .then(res => {
                        console.log(res.data)
                        setCurrentUser(res.data)
                        setIsAuth(true)
                        setUserDataChanged(false)

                    })
            } catch {

            }
        }
    }, [logined, userDataChanged])


    return (
        <Context.Provider value={currentUser}>
            <div className="app">
                <div className="app__content">
                    <Header
                        isOpen={isMobileMenuOpen}
                        onClose={handleMobileMenuClose}
                        onOpenMobileMenu={handleMobileMenuOpen}
                    />
                    <Switch>
                        <AuthRoutesContainer isAuth={isAuth} setAuth={setIsAuth}>
                                        <Route path="/profile" render={() => <Profile isAuth={isAuth} logined={logined}
                                                                                      setLogined={setLogined}
                                                                                      setIsAuth={setIsAuth}
                                                                                      userDataChanged={userDataChanged}
                                                                                      setUserDataChanged={setUserDataChanged}
                                                                                      setCurrentUser={setCurrentUser}/>}/>
                                        <Route path="/movies" render={() => <Movies isAuth={isAuth}/>}/>
                                        <Route path="/saved-movies" render={() => <SavedMovies isAuth={isAuth}/>}/>


                                        <Route path="/" exact render={() => <Main isAuth={isAuth}/>}/>
                                        <Route path="/signin" render={() => <Login isAuth={isAuth} setIsAuth={setIsAuth}
                                                                                   logined={logined}
                                                                                   setLogined={setLogined}/>}/>
                                        <Route path="/signup" render={() => <Register isAuth={isAuth}/>}/>

                        </AuthRoutesContainer>
                    </Switch>
                    <Footer/>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
