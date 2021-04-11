import React, { useState, useEffect,useContext } from 'react';
import './Profile.css';
import { getUserData, updateUserData } from "../../utils/MainApi"
import { useHistory } from 'react-router';
import { Context } from "../../context/Context"
import Preloader from '../Preloader/Preloader';
import Modal from "../Modal/Modal"


function Profile(props) {

    const [isFetching,setIsFetching]=useState(false)
    const [userName, setUserName] = useState("")
    const [emailDirty, setEmailDirty] = React.useState(false);
    const [userEmail,setUserEmail]=useState("")
    const [nameError, setNameError] = React.useState('Имя не может быть пустым');
    const [emailError, setEmailError] = React.useState('');
    const [nameDirty, setNameDirty] = React.useState(false);
    const [currentUserName,setCurrentUserName]=useState("")
    const [currentUserEmail,setCurrentUserEmail]=useState("")
    const [formValid, setFormValid] = React.useState(false)
    const history=useHistory()
    const user=useContext(Context)
    useEffect(() => {
       setIsFetching(true)
        try {
         getUserData()
            .then(res => {
                if (res.status == 200) {
              setCurrentUserName(res.data.name)
             setCurrentUserEmail(res.data.email)
            }
                
        })  
        }
        catch (e){
          
        }
      setIsFetching(false)
    },[])
    

    const handleName = (e) => {
        setUserName(e.target.value)
        const regExpEngName = /^[?!,.\-a-zA-Z0-9\s]+$/.test(e.target.value);

        if (e.target.value.length < 2 || e.target.value.length > 30) {
            setNameError('Длина имени должна составлять от 2 до 30 символов');
        } else if (!regExpEngName) {
            setNameError('Имя должно быть указано латиницей');
        } else {
            setNameError('');
        }
    }
    

    const handleEmail = (e) => {
        setUserEmail(e.target.value);
       
        const regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(e.target.value);

        if (!regExpEmail) {
            setEmailError('Некорректный email');
        } else {
            setEmailError('');
        }
    }

        function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
             
                break;

            case 'name':
                setNameDirty(true);
           
                break;

            default:
                console.log('Ошибка в blurHandler');
                break;
        }
    }


      React.useEffect(() => {
        if (emailError ||nameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, nameError]);
   


    useEffect(() => {
        console.log(userEmail)
        console.log(currentUserEmail)
    })

    const key={name:userName||currentUserName,email:currentUserEmail||userEmail}
    const handleSubmit = (e) => {
        e.preventDefault()
       setIsFetching(true)
        try {
            updateUserData(key)
                .then(res => {
                    props.setUserDataChanged(true)
                   
            })
        }catch {
          
        }

        try {
               getUserData()
            .then(res => {
             if (res.status == 200) {
             setCurrentUserName(res.data.name)
                 setCurrentUserEmail(res.data.email)
              
            }
        })
        } catch (e){
           
        }
     
        setIsFetching(false)
    }


const logOutMe = () => {
    localStorage.clear()
    props.setLogined(false);
    props.setIsAuth(false)
    history.push("/")
    props.setCurrentUser({})
    }

    if (isFetching) {
      return <Preloader/>
  }

    return (
        <>
        <div className="profile">
            <div className="profile__user-data-container">
                
                <h1 className="profile__title">Привет{user.name?`,${user.name}`:null }!</h1>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__user-name-email-container profile__user-name-email-container_type_first">
                        <p className="profile__user-data">Имя</p>
                        <input
                            type="text"
                            className="profile__input"
                            defaultValue={currentUserName ? `${currentUserName}` : null}
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
                            defaultValue={currentUserEmail ? `${currentUserEmail}` : null}
                            onChange={handleEmail}
                            onBlur={blurHandler}
                            name="email"
                        />
                    </div>
                    {(emailDirty && emailError) && <div className="error">{emailError}</div>}
            <div className="profile__buttons-container">
                <button type="submit" className="profile__button profile__button_type_edit">Редактировать</button>
                <button type="button" className="profile__button profile__button_type_logout" onClick={()=>logOutMe()}>Выйти из аккаунта</button>
            </div>
                </form>
            </div>
      
        </div>
    </>);
}

export default Profile;
