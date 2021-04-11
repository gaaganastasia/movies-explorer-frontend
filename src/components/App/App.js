import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import Navigation from "../Navigation/Navigation";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });

  const [error, setError] = React.useState("");
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function handleLogin(email, password) {
    setError("");
    setIsErrorVisible(false);

    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          history.push("/movies");
          setError("");
          setIsErrorVisible(false);
        }
        return res;
      })
      .catch((err) => {
        setError("Вы ввели неправильный логин или пароль.");
        setIsErrorVisible(true);
        return err;
      });
  }

  function handleSignUp(name, email, password) {
    setError("");
    setIsErrorVisible(false);

    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res.message) {
          setError("При регистрации пользователя произошла ошибка.");
          setIsErrorVisible(true);
        }
        return res;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        mainApi
          .authorize(email, password)
          .then((res) => {
            if (res.token) {
              setLoggedIn(true);
              history.push("/movies");
              setError("");
              setIsErrorVisible(false);
            }
            return res;
          })
          .catch((err) => {
            setError("При регистрации пользователя произошла ошибка.");
            setIsErrorVisible(true);
            return err;
          });
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    history.push("/");
  }

  ////////////////////////////////////////////////

  const [isNavOpen, setNavState] = React.useState(false);
  const changeNavState = () => {
    setNavState(!isNavOpen);
  };

  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverErr, setServerErr] = React.useState(false);

  function getMovies() {
    setIsLoading(true);

    moviesApi
      .getInitialMovies()
      .then((initialMovies) => {
        setMovies(initialMovies);
      })
      .catch((err) => {
        setServerErr(true);
        return err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [savedMovies, setSavedMovies] = React.useState([]);

  function getSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.reverse());
      })
      .catch((err) => {
        return err;
      });
  }

  function handleMovieState(movie) {
    const isSaved = savedMovies.some(
      (m) =>
        (m.movieId === movie.id || m.movieId === movie.movieId) &&
        m.owner === currentUser._id
    );

    if (isSaved) {
      mainApi
        .deleteMovie(
          movie._id || savedMovies.find((m) => m.movieId === movie.id)._id
        )
        .then((newMovie) => {
          setSavedMovies(
            savedMovies.filter(
              (m) =>
                m.movieId !== newMovie.movieId && m.owner === currentUser._id
            )
          );
        });
    } else {
      mainApi.saveMovie(movie).then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      });
    }
  }

  function handleUpdateUserInfo(data) {
    setError("");
    setIsErrorVisible(false);

    mainApi
      .setProfileInfo(data.email, data.name)
      .then((res) => {
        if (res.message) {
          setError("При обновлении профиля произошла ошибка.");
          setIsErrorVisible(true);
        } else {
          setCurrentUser(res);
          setError("");
          setIsErrorVisible(false);
        }
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  function handleScreenWidth() {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
  }

  React.useEffect(() => {
    setTimeout(handleScreenWidth, 10000);
  }, [screenWidth]);

  const [cardsQuantity, setCardsQuantity] = React.useState(0);
  const [clickNumber, setClickNumber] = React.useState(0);

  React.useEffect(() => {
    setClickNumber(clickNumber);
  }, [clickNumber]);

  function controlCardsQuantity() {
    let n;

    if (screenWidth >= 1280) {
      n = 12 + clickNumber * 3;
    } else if (screenWidth < 1280 && screenWidth >= 768) {
      n = 8 + clickNumber * 2;
    } else if (screenWidth < 768) {
      n = 5 + clickNumber * 2;
    }

    return setCardsQuantity(n);
  }

  const [checkboxState, setCheckboxState] = React.useState(false);

  function handleCheckboxState() {
    setCheckboxState(!checkboxState);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          changeNavState={changeNavState}
          loggedIn={loggedIn}
          history={history}
        />
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="movies" /> : <Main></Main>}
          </Route>

          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onLogOut={handleLogOut}
            history={history}
            onUpdateUserInfo={handleUpdateUserInfo}
            error={error}
            isErrorVisible={isErrorVisible}
          ></ProtectedRoute>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            setClickNumber={setClickNumber}
            clickNumber={clickNumber}
            savedMovies={savedMovies}
            controlCardsQuantity={controlCardsQuantity}
            cardsQuantity={cardsQuantity}
            movies={movies}
            serverErr={serverErr}
            setServerErr={setServerErr}
            checkboxState={checkboxState}
            handleCheckboxState={handleCheckboxState}
            changeMovieState={(movie) => handleMovieState(movie)}
            getMovies={getMovies}
            getSavedMovies={getSavedMovies}
            screenWidth={screenWidth}
          ></ProtectedRoute>

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            movies={savedMovies}
            isLoading={isLoading}
            setClickNumber={setClickNumber}
            clickNumber={clickNumber}
            serverErr={serverErr}
            setServerErr={setServerErr}
            checkboxState={checkboxState}
            handleCheckboxState={handleCheckboxState}
            loggedIn={loggedIn}
            changeMovieState={(movie) => handleMovieState(movie)}
            getSavedMovies={getSavedMovies}
            getMovies={getMovies}
            screenWidth={screenWidth}
            controlCardsQuantity={controlCardsQuantity}
            cardsQuantity={cardsQuantity}
          ></ProtectedRoute>

          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="movies" />
            ) : (
              <Login
                history={history}
                loggedIn={loggedIn}
                error={error}
                isErrorVisible={isErrorVisible}
                onLogin={handleLogin}
                //tokenCheck={tokenCheck}
              ></Login>
            )}
          </Route>

          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="movies" />
            ) : (
              <Register
                history={history}
                error={error}
                isErrorVisible={isErrorVisible}
                onRegister={handleSignUp}
              ></Register>
            )}
          </Route>

          <Route path="*">
            <PageNotFound history={history}></PageNotFound>
          </Route>
        </Switch>

        <Navigation
          isOpen={isNavOpen}
          changeState={changeNavState}
        ></Navigation>
        <Footer 
          history={history} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
