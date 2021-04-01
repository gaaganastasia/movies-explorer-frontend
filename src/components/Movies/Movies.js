import React from "react";
import './Movies.css';
//import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return(
    <div className="movies">
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
      <button type="button" className="movies__more-btn">Ещё</button>
    </div>
  )
}

export default Movies;