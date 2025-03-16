import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  handleSignOut,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleSignOutClick={handleSignOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
      <button className="profile__sign-out" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
