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
      title="Login"
      buttonText={isLoading ? "Logging in" : "Login"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          minLength="4"
          maxLength="64"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
      </label>
      <div className="modal__button-container">
        <button type="submit" className="modal__submit" disabled={!isValid}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <button
          className="modal__to-register"
          type="button"
          onClick={() => setActiveModal("register")}
        >
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}
