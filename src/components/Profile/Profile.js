import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import validator from "../Validator/Validator";

import "./Profile.css";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = validator();
  const [isFormStateActive, setIsFormStateActive] = React.useState(false);

  function editProfile() {
    setIsFormStateActive(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUserInfo({
      name: values.name || currentUser.name,
      email: values.email || currentUser.email,
    });

    if (props.error) {
      resetForm();
      setIsFormStateActive(false);
    } else {
      setIsFormStateActive(true);
    }
  }

  function signOut() {
    props.onLogOut();
    localStorage.removeItem("jwt");
  }

  return (
    <div className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
      <form
        className="profile-form"
        name="edit-profile"
        method="get"
        action="index.html"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="profile-form__field">
          <p className="profile-form__input-name">Имя</p>
          <input
            className="profile-form__input"
            name="name"
            placeholder={currentUser.name}
            onChange={handleChange}
            type="text"
            minLength="2"
            id="profile-name-input"
            disabled={!isFormStateActive}
          ></input>
        </label>
        <span
          className={`form__input-error ${
            errors.name ? `form__input-error_active` : ``
          }`}
          id="name-input-error"
        >
          {errors.name ? errors.name : ``}
        </span>
        <label className="profile-form__field">
          <p className="profile-form__input-name">Почта</p>
          <input
            className="profile-form__input"
            name="email"
            type="email"
            placeholder={currentUser.email}
            onChange={handleChange}
            minLength="2"
            id="profile-name-input"
            disabled={!isFormStateActive}
          ></input>
        </label>
        <span
          className={`form__input-error ${
            errors.email ? `form__input-error_active` : ``
          }`}
          id="email-input-error"
        >
          {errors.email ? errors.email : ``}
        </span>

        <span
          className={`form__submit-error ${
            props.isErrorVisible ? `form__submit-error_active` : ``
          }`}
        >
          {props.error}
        </span>
        <button
          type="submit"
          className={`profile-form__submit ${
            isFormStateActive ? `profile-form__submit_visible` : ``
          } ${
            isValid &&
            (values.name !== currentUser.name ||
              values.email !== currentUser.email)
              ? ``
              : `profile-form__submit_disabled`
          }`}
          disabled={
            !isValid ||
            (values.name === currentUser.name &&
              values.email === currentUser.email)
          }
        >
          Сохранить
        </button>
      </form>
      <button
        type="button"
        className={`profile__edit ${
          isFormStateActive ? `profile__edit_hidden` : ``
        }`}
        onClick={editProfile}
      >
        Редактировать
      </button>
      <Link
        to="/"
        className={`profile__logout ${
          isFormStateActive ? `profile__logout_hidden` : ``
        }`}
        onClick={signOut}
      >
        Выйти из аккаунта
      </Link>
    </div>
  );
}

export default Profile;
