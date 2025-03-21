import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, handleEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });

    console.log(currentUser);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <h2 className="modal__title">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal__input"
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="modal__input"
              required
            />
          </label>
          <button type="submit" className="modal__save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
