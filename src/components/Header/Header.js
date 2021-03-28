import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import projectLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header(props) {
    const {isOpen, onClose, onOpenMobileMenu} = props; 

    return (
        <Switch>
            <Route exact path="/">
                <header className="header header__bg-blue">
                    <Link to="/"><img className="header__logo" src={projectLogo} alt="Логотип"/></Link>
                    <nav className="header__auth-container__main-page">
                        <Link to="/signup"
                              className="header__auth-link header__auth-link_type_signup">Регистрация</Link>
                        <Link to="/signin" className="header__auth-link header__auth-link_type_signin">Войти</Link>
                    </nav>
                </header>
            </Route>
            <Route path={["/movies", "/saved-movies", "/profile"]}>
                <header className="header header_type_grid header__bg-black">
                    <div className="header__grid-wrap header__grid-wrap_type_start">
                        <Link to="/"><img className="header__logo" src={projectLogo}
                                          alt="Логотип"/></Link>
                    </div>
                    <Navigation
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpenMobileMenu={onOpenMobileMenu}
                    />
                    <div className="header__grid-wrap header__grid-wrap_type_end">
                        <Link to="/profile" className="header__auth-container header__auth-container_type_profile">
                            <p className="header__user-data">Аккаунт</p>
                            <div className="header__auth-pic"/>
                        </Link>
                    </div>
                    <button type="button" className="header__menu-burger-container"
                            onClick={isOpen ? onClose : onOpenMobileMenu}>
                        <span
                            className={`header__menu-burger-button ${isOpen && 'header__menu-burger-button_type_close'}`}/>
                    </button>
                </header>
            </Route>
        </Switch>
    );
}

export default Header;
