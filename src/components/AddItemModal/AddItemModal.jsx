import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./AddItemModal.css";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  buttonClassName,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setImage("");
    setWeather("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, image, weather }, resetForm);
  };
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImage("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClassName="modal__submit-new-garment"
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageChange}
          value={image}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
