import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, handleEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save Changes"
      buttonClassName="modal__submit-edit-profile"
    >
      <h2 className="modal__title">Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        className=" modal__form modal__form-edit-profile"
      >
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
      </form>
    </ModalWithForm>
  );
}

export default EditProfileModal;
