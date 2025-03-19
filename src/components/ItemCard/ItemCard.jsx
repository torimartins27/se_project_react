import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    console.log("Item:", item);
    console.log("Item ID:", item?._id);

    onCardLike({ item, isLiked });
  };

  console.log(item);
  return (
    <div className="item__container">
      <h2 className="card__name">{item.name}</h2>
      <img
        onCardClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      {currentUser && (
        <button
          className={
            isLiked ? "card__like-btn card__like-btn_active" : "card__like-btn"
          }
          onClick={handleLikeClick}
        ></button>
      )}
    </div>
  );
}

export default ItemCard;
