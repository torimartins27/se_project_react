import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `like-button ${
    isLiked ? "like-button_active" : ""
  }`;

  return (
    <div className="item__container">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label="Like"
        >
          button here
        </button>
      )}
    </div>
  );
}

export default ItemCard;
