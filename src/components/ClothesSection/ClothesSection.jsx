import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleCardClick,
  onCardLike,
  handleAddClick,
}) {
  console.log("clothing items here:", clothingItems);
  return (
    <div className="clothes-section">
      <div className="paragraphButton-section">
        <p className="clothing__section-items">Your Items</p>
        <button
          className="clothing__add-btn"
          onClick={handleAddClick}
          type="button"
        >
          Add New +
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardLike={onCardLike}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
