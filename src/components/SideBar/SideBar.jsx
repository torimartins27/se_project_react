import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
      );
    }

    const firstLetter = currentUser?.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "?";
    return <div className="sidebar__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        {renderUserAvatar()}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__change-profile">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__button"
        >
          Change Profile Data
        </button>
        <button
          onClick={handleSignOut}
          type="button"
          className="sidebar__button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
