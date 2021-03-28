import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile'
import Register from '../Register/Register';
import Login from '../Login/Login';

import './App.css';

function App() {
    const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);

    const routes = [
        {id: 7, path: "/", exact: true, component: Main},
        {id: 8, path: "/main", exact: true, component: Main},
        {id: 1, path: "/signup", component: Register},
        {id: 2, path: "/signin", component: Login},
        {id: 3, path: "/movies", component: Movies},
        {id: 4, path: "/saved-movies", component: SavedMovies},
        {id: 5, path: "/profile", component: Profile},
        {id: 6, path: "*", component: PageNotFound},
    ]

    function handleMobileMenuOpen() {
        toggleMobileMenu(true);
    }

    function handleMobileMenuClose() {
        toggleMobileMenu(false);
    }

    return (
        <div className="app">
            <div className="app__content">
                <Header
                    isOpen={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                    onOpenMobileMenu={handleMobileMenuOpen}
                />
                <Switch>
                    {routes?.map((route) => (
                        <Route
                            path={route?.path}
                            exact={route?.exact}
                            component={route?.component}
                            key={route?.id}
                        />
                    ))}
                </Switch>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
