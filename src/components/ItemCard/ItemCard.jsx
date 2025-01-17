import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  if (!item) {
    console.error("Item is undefined in ItemCard");
    return null;
  }
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div className="item__container">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.link}
        alt={item.name}
        className="card__image"
      />
    </div>
  );
}

export default ItemCard;
