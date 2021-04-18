import React from 'react';
import './FilterCheckbox.css';
import {connect} from "react-redux"
import { register } from '../../utils/MainApi';

function FilterCheckbox(props) {
  
  
    
    return (
        <div className="filter-checkbox">
            <label className="filter-checkbox__container">
                <input className="filter-checkbox__input" type="checkbox" onChange={props.onCheckboxChange} />
                <span className="filter-checkbox__slider" />
            </label>
            <p className="filter-checkbox__text">Короткометражки</p>
        </div>
    );
}






export default FilterCheckbox
