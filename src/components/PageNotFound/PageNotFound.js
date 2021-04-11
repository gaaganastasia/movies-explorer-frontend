import React from "react";
import "./PageNotFound.css";

function PageNotFound(props) {
  function goBack() {
    props.history.goBack();
  }

  return (
    <div className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__caption">Страница не найдена</p>
      <p className="not-found__link" onClick={goBack}>
        Назад
      </p>
    </div>
  );
}

export default PageNotFound;
