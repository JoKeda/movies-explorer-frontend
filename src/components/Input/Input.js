import React from "react"
import './Input.css';

function Input(props) {
    const {
        type,
        placeholder,
        autoComplete = "none",
        pattern,
        minLength,
        maxLength,
        title,
        required,
        label,
        change,
        onblur,
        name
    } = props;

    return (
        <div className="input__block">
            {label && (<p className="register__input-name">{label}</p>)}
            <input
                type={type}
                className="input"
                placeholder={placeholder}
                autoComplete={autoComplete}
                pattern={pattern}
                required={required}
                title={title}
                minLength={minLength}
                maxLength={maxLength}
                onChange={props.change}
                onBlur={props.onblur}
                name={props.name}

            />
        </div>
    )
}

export default Input