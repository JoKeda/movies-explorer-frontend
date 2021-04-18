import React from 'react';
import './Preloader.css';

function Preloader() {
    return (
    <div className="preloader_wrapper">
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round" />
            </div>
            </div>
        </div>
    );
}

export default Preloader;
