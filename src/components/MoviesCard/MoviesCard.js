import React from "react";
import './MoviesCard.css';
import movieImg from '../../images/movie-img.png';
 
function MoviesCard() {
  return(
    <div className="movie">
      <p className="movie__title">33 слова о дизайне</p>
      <p className="movie__duration">1ч 47м</p>
      <button type="button" className="movie__save-btn"></button>
      <img src={movieImg} alt="Кадр из фильма" className="movie__img"></img>
    </div>
  )
}

export default MoviesCard;