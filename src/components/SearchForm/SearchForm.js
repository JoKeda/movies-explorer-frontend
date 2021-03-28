import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm() {
    return (
        <form className="search-form">
            <div className="search-form__container">
                <input
                    type="text"
                    className="search-form__input"
                    placeholder="Фильм"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <button type="submit" className="search-form__button">
                    Найти
                </button>
            </div>
            <FilterCheckbox/>
            <span className="search-form__line"/>
        </form>
    );
}

export default SearchForm;
