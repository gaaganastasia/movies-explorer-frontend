import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about-project" id="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__container">
        <p className="about-project__title">
          Дипломный проект включал 5 этапов
        </p>
        <p className="about-project__subtitle">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="about-project__title">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="about-project__subtitle">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__time">
        <div className="about-project__back">1 неделя</div>
        <div className="about-project__front">4 недели</div>
        <p className="about-project__caption">Back-end</p>
        <p className="about-project__caption">Front-end</p>
      </div>
    </div>
  );
}

export default AboutProject;
