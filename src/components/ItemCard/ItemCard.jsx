import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  console.log("Image link!!", item.imageUrl);

  return (
    <div className="item__container">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </div>
  );
}

export default ItemCard;
