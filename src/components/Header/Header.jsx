import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onSignupClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    }
    const firstLetter = currentUser?.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header">
      <div className="header__container-left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {renderUserAvatar()}
              </div>
            </Link>{" "}
          </>
        ) : (
          <>
            <button className="modal__button-signup" onClick={onSignupClick}>
              Sign Up
            </button>
            <button className="modal__button-login" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
