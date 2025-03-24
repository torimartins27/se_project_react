import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleSignOut,
  onCardLike,
  handleEditProfileClick,
  isLiked,
  isLoggedIn, // isLoggedIn is passed as a prop
}) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleSignOut={handleSignOut}
        />
      </section>

      <section className="profile__clothing-items">
        {isLoggedIn ? (
          <>
            <ClothesSection
              clothingItems={clothingItems}
              handleCardClick={handleCardClick}
              handleAddClick={handleAddClick}
              onCardLike={onCardLike}
              isLiked={isLiked}
            />
          </>
        ) : (
          <p>Please log in to view your clothing items.</p>
        )}
      </section>
    </div>
  );
}

export default Profile;
