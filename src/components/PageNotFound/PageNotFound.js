import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="page-not-found">
            <div className="page-not-found__section">
                <h2 className="page-not-found__text">404</h2>
                <p className="page-not-found__description">Страница не найдена</p>
            </div>
            <Link to="/" className="page-not-found__back">Назад</Link>
        </div>
    );
}

export default PageNotFound;
