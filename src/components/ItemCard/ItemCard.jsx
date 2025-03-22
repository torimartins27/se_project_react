import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    currentUser?._id &&
    item.likes.some((id) => id.toString() === currentUser._id.toString());

  const handleLikeClick = () => {
    onCardLike({ item, isLiked });
  };

  return (
    <div className="item__container">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {currentUser && (
          <button
            className={
              isLiked
                ? "card__like-btn card__like-btn_active"
                : "card__like-btn"
            }
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
      <img
        onClick={() => handleCardClick(item)}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </div>
  );
}

export default ItemCard;
