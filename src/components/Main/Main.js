import React from 'react';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

import './Main.css';
import {useHistory} from "react-router-dom";

function Main({isAuth}) {
    // const history = useHistory();
    // if(isAuth) history.push('/movies')

    
    return (
        <div className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </div>
    );
}

export default Main;
