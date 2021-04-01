import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

function SearchForm() {
  const [movie, setMovie] = React.useState('');

  function handleSearchMovie(e) {
    setMovie(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <div className="search-form">
      <form
        method="post"
        action="index.html"
        name="search"
        className="search-form__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="search-form__field" htmlFor="movie">
          <input
            name="movie"
            type="text"
            placeholder="Фильм"
            value={movie}
            onChange={handleSearchMovie}
            id="movie"
            className="search-form__input search-form__input-movie"
            required
          ></input>
        </label>
        <button type="submit" className="search-form__submit">
          Найти
        </button>
      </form>
      <FilterCheckbox></FilterCheckbox>
    </div>
  )
}

export default SearchForm;