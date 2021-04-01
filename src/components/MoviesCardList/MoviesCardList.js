import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList() {
  return(
    <div className="movies__container">
      <MoviesCard></MoviesCard>
      <MoviesCard></MoviesCard>
      <MoviesCard></MoviesCard>
      <MoviesCard></MoviesCard>
      <MoviesCard></MoviesCard>
      <MoviesCard></MoviesCard>
      <MoviesCard></MoviesCard>
    </div>
  )
}

export default MoviesCardList;