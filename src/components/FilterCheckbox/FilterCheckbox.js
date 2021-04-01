import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  return(
    <div className="checkbox">
      <label className="switch">
        <input type="checkbox" className="checkbox__container"></input>
        <span className="slider round"></span>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;