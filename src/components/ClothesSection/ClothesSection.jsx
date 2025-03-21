import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  clothingItems,
  handleCardClick,
  onCardLike,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
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
          if (item.owner === currentUser._id) {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardLike={onCardLike}
                handleCardClick={handleCardClick}
              />
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
