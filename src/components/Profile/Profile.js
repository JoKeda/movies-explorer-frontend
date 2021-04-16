import React, { useState, useEffect,useContext } from 'react';
import './Profile.css';
import mainApi from "../../utils/MainApi"
import { useHistory } from 'react-router';
import { Context } from "../../context/Context"
import Preloader from '../Preloader/Preloader';
import Modal from "../Modal/Modal"


function Profile(props) {

    const history = useHistory()
    // if(!props.isAuth) history.push('/')
    const [isFetching,setIsFetching]=useState(false)
    const [userName, setUserName] = useState("")
    const [emailDirty, setEmailDirty] = React.useState(false);
    const [userEmail,setUserEmail]=useState("")
    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [nameDirty, setNameDirty] = React.useState(false);
    const [currentUserName,setCurrentUserName]=useState("")
    const [currentUserEmail,setCurrentUserEmail]=useState("")
    const [formValid, setFormValid] = React.useState(false)
    const user = useContext(Context)
    const [notification, setNotification] = useState("")
    

React.useEffect(() => {
        setUserName(currentUserName);
        setUserEmail(currentUserEmail);

    }, [currentUserName,currentUserEmail]);

useEffect(() => {
       setIsFetching(true)
         mainApi.getUserData(localStorage.getItem('token'))
            .then(res => {
             if (res) {
            setCurrentUserName(res.name)
            setCurrentUserEmail(res.email)

            }
                
        })  

      setIsFetching(false)
},[])
    

const handleName = (e) => {
        setUserName(e.target.value);

        setNameDirty(true);
        const regExpEngName = /^[?!,.\-a-zA-Z0-9\s]+$/.test(e.target.value);

        if (e.target.value.length < 2 || e.target.value.length > 30) {
            setNameError('Длина имени должна составлять от 2 до 30 символов');
        } else if (!regExpEngName) {
            setNameError('Имя должно быть указано латиницей');
        } else if (e.target.value === currentUserName) {
            setNameError('Заданное имя совпадает с текущим именем');
         
        } else {
            setNameError('');
        }
    }
    

    const handleEmail = (e) => {
        setUserEmail(e.target.value);

        setEmailDirty(true);
        const regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(e.target.value);

        if (!regExpEmail) {
            setEmailError('Некорректный email');
        } else if (e.target.value === currentUserEmail) {
            setEmailError('Заданный email совпадает с текущим email')
    
        } else {
            setEmailError('');
        }
    }

    function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                if (currentUserName === e.target.value) {
            setEmailError('Заданный email совпадает с текущим email')
          
                }
                break;

            case 'name':
                setNameDirty(true);
                 if (currentUserEmail === e.target.value) {
            setNameError('Заданное имя совпадает с текущим именем')
             
                }
                break;

            default:
                console.log('Ошибка в blurHandler');
                setEmailError("")
                setNameError("")
                break;
        }
    }


    React.useEffect(() => {
        if (nameError || emailError || (userName === currentUserName) || (userEmail === currentUserEmail)) {
            
            setFormValid(false)
        } else {
            setFormValid(true)
         
        }
    },[nameError, emailError, userName, userEmail, currentUserName,currentUserEmail]);
   


 

    const key = { name: userName , email:userEmail }


const handleSubmit = (e) => {
        e.preventDefault()
       setIsFetching(true)
       
            mainApi.updateUserData(key)
                .then(res => {
                    console.log(res)
                    if (res.email && res.name)  {
            setCurrentUserName(res.name)
            setCurrentUserEmail(res.email)
            
            setNotification("Ваши данные удачно обновлены")
            
                    
                   } else {
                        setNotification(res.message)
                   }  

            })
      


     
        setIsFetching(false)
    }
const handleLogOut = () => {
    props.logOutMe()
}



const clearNotification = () => {
    setNotification("")
}

    if (isFetching) {
      return <Preloader/>
  }

    return (
        <>
        <div className="profile">
            <div className="profile__user-data-container">
                
                <h1 className="profile__title">{`Привет, ${currentUserName}!`}</h1>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__user-name-email-container profile__user-name-email-container_type_first">
                        <p className="profile__user-data">Имя</p>
                        <input
                            type="text"
                            className="profile__input"
                            value={userName||""}
                            onChange={handleName}
                            onBlur={blurHandler}
                            name="name"
                        />
                     
                    </div>
                   {(nameDirty && nameError) && <div className="error">{nameError}</div>}
                    <div className="profile__user-name-email-container profile__user-name-email-container_type_second">
                        <p className="profile__user-data">Почта</p>
                        <input
                            type="text"
                            className="profile__input"
                            value={userEmail||""}
                            onChange={handleEmail}
                            onBlur={blurHandler}
                            name="email"
                        />
                    </div>
                    {(emailDirty && emailError) && <div className="error">{emailError}</div>}
                        <div className="profile__buttons-container">
                            {formValid ? <button type="submit" disabled={!formValid} className="profile__button profile__button_type_edit">Редактировать</button> :
                             <button type="submit" disabled={!formValid} className="profile__button profile__button_type_edit non_valid">Редактировать</button>}
               
                <button type="button" className="profile__button profile__button_type_logout"   onClick={()=>handleLogOut()}>Выйти из аккаунта</button>
            </div>
                    </form>
                    <div className="notification">
                        <div >{notification}</div>
                        {notification!==""?<div className="close" onClick={clearNotification}>X</div>:null}
                    </div>
            </div>
      
        </div>
    </>);
}

export default Profile;
