import React from "react";
import './AboutMe.css';
import photo from "../../images/photo.jpg"

function AboutMe() {
  return(
    <div className="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <h3 className="about-me__name">Анастасия</h3>
        <p className="about-me__age">Фронтенд-разработчик, 18 лет</p>
        <p className="about-me__info">Я живу в Красноярске, заканчиваю 11 класс КГАОУ "ШК". Люблю слушать музыку и увлекаюсь теннисом. 
        Недавно начала заниматься веб-разработкой и планирую продолжать развиваться в этой сфере.</p>
        <img className="about-me__photo" src={photo} alt="Моё фото"></img>
        <div className="about-me__media">
          <a className="about-me__link" href="https://www.instagram.com/ndthwm/" target="_blank" rel="noreferrer">Instagram</a>
          <a className="about-me__link" href="https://github.com/gaaganastasia" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
      
    </div>
  )
}

export default AboutMe;