import React from 'react';
import {useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
    const history=useHistory()
    return (
        <div className="page-not-found">
            <div className="page-not-found__section">
                <h2 className="page-not-found__text">404</h2>
                <p className="page-not-found__description">Страница не найдена</p>
            </div>
            <button className="page-not-found__back" onClick={history.goBack}>Назад</button>
        </div>
    );
}

export default PageNotFound;
