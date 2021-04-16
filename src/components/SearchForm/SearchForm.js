import e from 'cors';
import React, { useEffect, useRef ,useState,useContext} from 'react';
import {connect} from "react-redux"
import mainApi from '../../utils/MainApi';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from '../Preloader/Preloader';
import moviesApi from "./../../utils/MoviesApi"
import './SearchForm.css';
import { useHistory } from 'react-router';
import { Context } from "../../context/Context"





function SearchForm(props) {
    const [moviesData,setMoviesData]=useState([])
    const [clicked,setCklicked]=useState(false)
    const [allMovies, setAllMovies] = useState([])
    const [saveMovies, setSaveMovies] = useState([])
    const [error, setError] = useState('Нужно ввести ключевое слово')
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
    const mergedMovies = [...movies]
    for (let j = 0; j < userMovies.length; j++){
        for (let i = 0; i < mergedMovies.length; i++){
            if (mergedMovies[i].id === userMovies[j].movieId) {
                   mergedMovies[i]=userMovies[j]
     
              
            }
          
        }
    }
    return mergedMovies;
    }







useEffect(async() => {
        setIsFetching(true)

    moviesApi.setMovies()
        .then(res => {

               setMoviesData(res)
                setAllMovies(res)
            setNotification("")
        })
        .catch(err => {
            setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
    
        setIsFetching(false)
}, [])


useEffect(async() => {
        setIsFetching(true)
     
    mainApi.getMovies()
        .then(res => {
                setSaveMovies(res)
                setAllMovies(matchedMovies(allMovies,res))
                setNotification("")
        })
        .catch(err => {
            setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
           

      
    setIsFetching(false)
    
},[])
    
    

   
    
const toggleMovieSave = (movie) => {
        if (saveMovies.findIndex(item=>item.movieId===movie.id||movie.movieId||movie._id)==-1) {
            setIsFetching(true)
    
                mainApi.saveMovie(movie)
                    .then(response => {
                            mainApi.getMovies()
                                .then(res => {
                              
                                        setSaveMovies(res)
                                        setAllMovies(matchedMovies(moviesData,res))
                                        setIsAdd(true)
                                    
                                })

                    
                            setNotification("")
                
                        }
                    )
 
            setIsFetching(false)
        }
    }

const removeId = (allMovies = [], id) => {
  const allNewMovies=[...allMovies]
     for (let i = 0; i < allNewMovies.length; i++){
                if (allMovies[i]._id === id) {
                    delete allMovies[i]._id
                   
                }
    }
    return allNewMovies
}
    



 const removeMovie = async (id) => {

   
    setIsFetching(true)
mainApi.deleteMovies(id)
 removeId(allMovies,id)
     mainApi.getMovies()
         .then(res => {
                 setSaveMovies(res)
                setAllMovies(matchedMovies(moviesData,res))
                setIsAdd(true)
            })

                reset(id)
   setIsFetching(false)
}

const reset = (id) => {
    
         setIsFetching(true)

    mainApi.deleteMovies(id)
        .then(res => {
        setSaveMovies(prev => prev.filter(item => item._id !== id))
       setNotification("")
    })
        setIsFetching(false)
}  




    

const searchData = (e) => {
    e.preventDefault()
    setSearchValue(inputValue)
    setCklicked(true)
    if (inputValue == "") {
        setError("Нужно ввести ключевое слово")
    } else {
        setError("")
    }
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
    











    
const checkOnInputChange=(value)=> {
        setInputValue(value)

    }
    

useEffect(() => {
    if (error !== "") {
          setValid(false)
    } else {
          setValid(true)
      }
},[error])

    




function searchMovieFilter(movies=[], value="") {
        return movies.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(value.toLowerCase())} );
}

function movieDurationFilterShort(movies=[]) {
    return movies?.filter((movie) =>movie.duration <= 40 );
    }

function movieDurationFilterLong(movies=[]) {
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
  
const changeMoviesList = (movie1=[], movie2=[]) => {
        if (checkboxChecked == false) {
            return movie1
        } 
        return movie2
    }
const onKeyPressHandler = (e) => {
        if (e.key == "Enter") {
       setSearchValue(prev => prev = inputValue)
       setCklicked(true)
    }
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
                    onChange={e => checkOnInputChange(e.target.value)}
                    onKeyPress={onKeyPressHandler}
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