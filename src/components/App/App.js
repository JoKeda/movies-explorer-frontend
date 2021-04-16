import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
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
import ProtectedRoute from "./../ProtectedRoute/index"
import mainApi from '../../utils/MainApi';
function App() {
   
    const [userDataChanged, setUserDataChanged] = useState(false)
    const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [logined, setLogined] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [error,setError]=useState("")
    const history = useHistory()
    



const handleCklick = (keys) => {

        setIsFetching(true)
         
               mainApi.signIn(keys)
                   .then(response => {
                   if (response.token) {
                    localStorage.setItem("token", response.token)
                    setLogined(true)
                    setIsAuth(true)
                    history.push('/movies')
                     setIsFetching(false)   
                }else{
                    setError(response.message)
                }
                   })

    



    }
    

const handleRegister = (keys) => {
        setIsFetching(true)
        mainApi.signUp(keys)
            .then(response => {
           if (response) {
                    setError("")
               history.push("/signin")
                setIsFetching(false)
           } else {
            setError(response.message)
                 }
  
    })

  
}

const logOutMe = () => {
localStorage.clear()
setLogined(false);
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

useEffect(() => {
const tkn = localStorage.getItem('token')
        if (logined && tkn) {
    mainApi.getUserData(tkn)
    .then(res => {
    setCurrentUser(res)
     setIsAuth(true)
    setUserDataChanged(false)
                        
                    })


        }
}, [logined, userDataChanged])
    
    
    

    
    


    if (isFetching) {
            return <Preloader/>
        }

    return (
        <Context.Provider value={currentUser}>
            <div className="app">
                <div className="app__content">
                    
                    {/* <Header
                        isOpen={isMobileMenuOpen}
                        onClose={handleMobileMenuClose}
                        onOpenMobileMenu={handleMobileMenuOpen}
                        isAuth={isAuth}
                    /> */}
           
                    <AuthRoutesContainer isAuth={isAuth} setAuth={setIsAuth}>
                                            <Header
                        isOpen={isMobileMenuOpen}
                        onClose={handleMobileMenuClose}
                        onOpenMobileMenu={handleMobileMenuOpen}
                        isAuth={isAuth}
                    />
                                 <Switch>
                                        {/* <Route path="/profile" render={() => <Profile isAuth={isAuth} logined={logined}
                                                                                      setLogined={setLogined}
                                                                                      setIsAuth={setIsAuth}
                                                                                      userDataChanged={userDataChanged}
                                                                                      setUserDataChanged={setUserDataChanged}
                                                                                      setCurrentUser={setCurrentUser}/>}/> */}
                            {/* <Route path="/movies" render={() => <Movies isAuth={isAuth} />} /> */}

                                        {/* <Route path="/saved-movies" render={() => <SavedMovies isAuth={isAuth}/>}/> */}
                                                        <ProtectedRoute isAuth={isAuth} path="/saved-movies" component={ ()=>(<SavedMovies/>) } />
                            <ProtectedRoute isAuth={isAuth} path="/movies" component={() => (<Movies isAuth={isAuth}/>)} />
                                                        <ProtectedRoute isAuth={isAuth} path="/profile" component={ ()=>(<Profile isAuth={isAuth} logined={logined}
                                                                                      setLogined={setLogined}
                                                                                      setIsAuth={setIsAuth}
                                                                                      userDataChanged={userDataChanged}
                                                                                      setUserDataChanged={setUserDataChanged}
                                                                                       setCurrentUser={setCurrentUser}
                                                                                       logOutMe={logOutMe}
                            />)} />
                                        <Route path="/" exact render={() => <Main isAuth={isAuth}/>}/>
                                        <Route path="/signin" render={() => <Login isAuth={isAuth} setIsAuth={setIsAuth}
                                                                                    logined={logined}
                                                                                    error={error}
                                                                                    setLogined={setLogined}
                                                                                    handleCklick={handleCklick}
                                                                                    isFetching={isFetching}
                                  
                            />} />
                            <Route path="/signup" render={() => <Register isAuth={isAuth} handleRegister={handleRegister} error={error} isFetching={isFetching}/>} />
                            <Route path="*" component={PageNotFound}/>
     </Switch>
                        </AuthRoutesContainer>
               
                    <Footer/>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
