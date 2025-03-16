import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

export default function RegisterModal({
  handleRegister,
  isLoading,
  isOpen,
  onClose,
  handleLoginClick,
}) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const onRegistration = (event) => {
    event.preventDefault();
    handleRegister(values);
    resetForm();
  };

  const handleOrLoginClick = () => {
    handleLoginClick();
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Registering..." : "Next"}
      isOpen={isOpen}
      onClose={onClose}
      formValid={isValid}
      onSubmit={onRegistration}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          id="register-email"
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          id="register-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          id="register-name"
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          id="register-avatar"
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar || ""}
          required
        />
      </label>
      <div className="modal__button-containter">
        <button
          type="button"
          className="modal__to-login"
          onClick={handleOrLoginClick}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
}
