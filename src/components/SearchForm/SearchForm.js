import e from 'cors';
import React, { useEffect, useRef ,useState,useContext} from 'react';
import {connect} from "react-redux"
import { deleteMovies,getMovies,saveMovie } from '../../utils/MainApi';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from '../Preloader/Preloader';
import {setMovies} from "./../../utils/MoviesApi"
import './SearchForm.css';
import { useHistory } from 'react-router';
import { Context } from "../../context/Context"





function SearchForm(props) {
    const [clicked,setCklicked]=useState(false)
    const [allMovies, setAllMovies] = useState([])
    const [saveMovies, setSaveMovies] = useState([])
    const [error, setError] = useState("")
    const ref = useRef(null)
    const [searchValue, setSearchValue] = useState("")
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isFetching,setIsFetching]=useState(false)
    const [valid,setValid]=useState(true)
    const [searchDataDirty, setSearchDataDirty] = useState(false)
    const [notification, setNotification] = useState("")
    const [isAdd,setIsAdd]=useState(false)
    const user=useContext(Context)

function matchedMovies(movies=[], userMovies=[]) {
    for (let i = 0; i < movies.length; i++){
        for (let j = 0; j < userMovies.length; j++){
            if (movies[i].id == userMovies[j].movieId) {
                movies[i]._id = userMovies[j]._id
                movies[i].isAdded=true
                console.log(movies[i])
            }
          
        }

    }
    return movies;
    }


function addMatchedMovies(saveMovies=[],movie,id) {
    for (let i = 0; i < saveMovies.length; i++){
        if (saveMovies[i].id == id) {
            movie.isAdded = true
            movie._id=saveMovies[i]._id
        }

    }
    console.log(movie)
    return movie;
    }

function removeMatchedMovies(saveMovies=[],movie,id) {
    for (let i = 0; i < saveMovies.length; i++){
        if (saveMovies[i]._id == id) {
            movie.isAdded = false
            
        }

    }
    return movie;
    }


useEffect(async() => {
        setIsFetching(true)
        try {
         const res=await  setMovies()
            if (res.statusText == "OK") {
                setAllMovies(res.data)
                setNotification("")
         }  }
        catch (e) {
            setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        }
        setIsFetching(false)
    }, [])


useEffect(async() => {
        setIsFetching(true)
        try {
          const res=await  getMovies()
           
            if (res.statusText == "OK") {
                setSaveMovies(res.data)
                // setAllMovies(matchedMovies(allMovies,saveMovies))
                        setNotification("")
                    }
        }
        catch (e) {
             setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        }
       setIsFetching(false) 
    }, [])
    

const removeMovie = async(movie,id) => {
    setIsFetching(true)
    try {
       let res= await deleteMovies(id)
        if (res.data.status == 200) {
              setAllMovies(prev=>[...prev,removeMatchedMovies(saveMovies,movie,id)])
                reset()
          }
 } catch(e) {
  
    }
    
   setIsFetching(false)
}

const reset = async (id) => {
    
         setIsFetching(true)
        try {
           const res=await deleteMovies(id)
                
                    if (res.status == 200) {
                        setSaveMovies(prev => prev.filter(item => item._id !== id))
                        setNotification("")
                    }
        }
        catch (e) {
              setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        }
        setIsFetching(false)
}

    




    

const searchData = (e) => {
    e.preventDefault()
    setSearchValue(prev => prev = inputValue)
    setCklicked(true)
   
  }
    



    
    const filteredMovies = (searchValue.length) ? searchMovieFilter(allMovies, searchValue) : []
    const shortMovies = (searchValue.length) ? movieDurationFilterShort(allMovies) : []
    const longMovies = (searchValue.length) ? movieDurationFilterLong(allMovies) : []
    const shortFilteredMovies = (searchValue.length) ? movieDurationFilterShort(filteredMovies) : []
    const longFilteredMovies=(searchValue.length) ? movieDurationFilterLong(filteredMovies) : []
    const filteredSaveMovies = (searchValue.length) ? searchMovieFilter(saveMovies, searchValue) : []
    const shortSaveFilteredMovies = (searchValue.length) ? movieDurationFilterShort(filteredSaveMovies) : []
    const longSaveFilteredMovies=(searchValue.length) ? movieDurationFilterLong(filteredSaveMovies) : []
    const shortSaveMovies = (saveMovies.length > 0) ? movieDurationFilterShort(saveMovies) : []
    const longSaveMovies=(saveMovies.length>0)?movieDurationFilterLong(saveMovies):[]
    

useEffect(() => {
    
setAllMovies(matchedMovies(allMovies,saveMovies))
     console.log(saveMovies) 
})










    
const checkOnInputChange=(value)=> {
        setInputValue(value)
        if (value.length==0) {
            setError(prev=>prev="Нужно ввести ключевое слово")
        }
        else {
             setError(prev=>prev="")
        }
    }
    

useEffect(() => {
    if (error !== "") {
          setValid(false)
    } else {
          setValid(true)
      }
},[error])

    
const toggleMovieSave = (movie,id,shortId) => {
       setIsFetching(true)
        try {
            saveMovie(movie)
                .then(response => {
                    if (response.status == 201) {
                    setAllMovies(prev=>[...prev,addMatchedMovies(saveMovies,movie,shortId)])
                    setNotification("")
                
             }
            })
        }
        catch (e) {
               setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        }
      setIsFetching(false)
  }



function searchMovieFilter(movies, value) {
        return movies.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(value.toLowerCase())} );
}

function movieDurationFilterShort(movies) {
    return movies.filter((movie) =>movie.duration <= 40 );
    }

function movieDurationFilterLong(movies) {
    return movies.filter((movie) =>movie.duration > 40 );
  }


const handleBlur = (e) => { 
        switch (e.target.name) {
            case 'search':
                setSearchDataDirty(true)
           
                break;

            default:
              
                break;
        }
  }
   
const onCheckboxChange = () => {
        setCheckboxChecked(!checkboxChecked);
    }
  
const changeMoviesList = (movie1, movie2) => {
        if (checkboxChecked == false) {
            return movie1
        } 
        return movie2
    }

if (isFetching) {
        return <Preloader/>
    }

    
    return (<>
        <div className="search-form">
            <div className="search-form__container">
                <input
                    ref={ref}
                    type="text"
                    className="search-form__input"
                    placeholder="Фильм"
                    minLength="2"
                    maxLength="30"
                    onChange={e =>checkOnInputChange(e.target.value)}
                    value={inputValue}
                    onBlur={e=>handleBlur(e)}
                    name="search"
                     />
               
                <button type="submit" className="search-form__button" onClick={searchData} > 
                    Найти
                </button>
               
            </div>
            {(searchDataDirty&&error)&&<p>{error}</p>}
          
            <FilterCheckbox onCheckboxChange={onCheckboxChange}/>
            <span className="search-form__line"/>
        </div>

            <MoviesCardList
            shortFilteredMovies={shortFilteredMovies}
            longFilteredMovies={longFilteredMovies}
            checkboxChecked={checkboxChecked}
            movies={filteredMovies}
            saveFilteredMovies={filteredSaveMovies}
            shortSaveFilteredMovies={shortSaveFilteredMovies}
            longSaveFilteredMovies={longSaveFilteredMovies}
            allSaveMovies={saveMovies}
            longSaveMovies={longSaveMovies}
            shortSaveMovies={shortSaveMovies}
            reset={reset}
            toggleMovieSave={toggleMovieSave}
            searchValue={searchValue}
            clicked={clicked}
            error={error}
            notification={notification}
            isAdd={isAdd}
            setIsAdd={setIsAdd}
            removeMovie={removeMovie}
        />
        
</>)
}



export default SearchForm