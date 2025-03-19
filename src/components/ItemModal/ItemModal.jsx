import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  onClose,
  card,
  selectedCard,
  onSelectCard,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = selectedCard?.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-item-btn ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  const submitDelete = () => {
    if (isOwn) {
      onDeleteClick();
    }
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <img
          src={card.imageUrl}
          alt="clothing image"
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button onClick={submitDelete} className={itemDeleteButtonClassName}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
