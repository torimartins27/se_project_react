import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id.toString() === currentUser?._id.toString());

  console.log("Item Likes:", item.likes);
  console.log("Current User ID:", currentUser?._id);
  console.log("Is Liked:", isLiked);

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
        onClick={() => handleCardClick(item)}
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
