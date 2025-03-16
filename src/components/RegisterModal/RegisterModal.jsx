import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

export default function RegisterModal({
  onClose,
  isOpen,
  handleRegistration,
  setActiveModal,
  isLoading,
}) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
    resetForm({ email: "", password: "" });
  };
  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Registering..." : "Next"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
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
        Password*
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
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*{" "}
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
        <button type="submit" className="modal__submit" disabled={!isValid}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
        <button
          type="button"
          className="modal__to-login"
          onClick={() => setActiveModal("login")}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
}
