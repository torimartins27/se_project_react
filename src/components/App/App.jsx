import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signUp, signIn, fetchUserData } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AddItemModal from "../AddItemModal/AddItemModal";

import { defaultClothingItems } from "../../utils/constants";
import { addCardLike, getItems, removeCardLike } from "../../utils/api";
import { postItem } from "../../utils/api";
import { deleteItem } from "../../utils/api";
import { updateProfile } from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleOpenLogin() {
    setActiveModal("login");
  }

  function handleOpenRegister() {
    setActiveModal("register");
  }

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-modal");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLikeClick = (item, isLiked) => {
    const token = localStorage.getItem("jwt");
    const id = item._id;
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedItem) => {
          setClothingItems((cards) =>
            cards.map((card) => (card._id == id ? updatedItem : card))
          );
        })
        .catch((err) => console.log(err));
    } else
      removeCardLike(id, token)
        .then((updatedItem) => {
          setClothingItems((cards) =>
            cards.map((card) => (card._id == id ? updatedItem : card))
          );
        })
        .catch((err) => console.log(err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, image, weather }, resetForm) => {
    const newItem = {
      name,
      imageUrl: image,
      weather,
    };

    postItem(newItem, localStorage.getItem("jwt"))
      .then((dbItem) => {
        setClothingItems((prevItems) => [dbItem.item, ...prevItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  const handleDeleteCard = () => {
    deleteItem(selectedCard._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard(null);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error deleting the item:", err);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    const updatedItem = { name, avatar };
    updateProfile(updatedItem, localStorage.getItem("jwt"))
      .then((data) => {
        setCurrentUser(data);
        console.log("current user:", currentUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Error editing profile", err));
  };

  const handleRegister = (values) => {
    setIsLoading(true);
    signUp(values.name, values.avatar, values.email, values.password)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Signup failed");
          });
        }
        return res.json();
      })
      .then(() => signIn(values.email, values.password))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Login failed");
          });
        }
        return res.json();
      })
      .then((data) => {
        if (!data.token) throw new Error("Token not received");
        localStorage.setItem("jwt", data.token);
        return fetchUserData(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData.foundUser);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((error) => console.error(" failed", error))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    signIn(values.email, values.password)
      .then((data) => {
        console.log("Response Data:", data); // Debugging
        if (!data.token) {
          throw new Error("Token not received");
        }
        localStorage.setItem("jwt", data.token);
        return fetchUserData(data.token);
      })
      .then((userData) => {
        console.log("Fetched userData:", userData); // Debugging
        setCurrentUser(userData.foundUser);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((error) => console.error("Login failed", error))
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched clothing items:", data); // Debugging
        setClothingItems(data.items);
      })
      .catch(console.error);
  }, []);

  console.log(clothingItems);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setCurrentUser(userData.foundUser);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
          navigate("/signin");
        });
    }
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page_content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleOpenLogin}
              onSignupClick={handleOpenRegister}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleLikeClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    handleSignOut={handleSignOut}
                    onCardLike={handleLikeClick}
                    handleEditProfileClick={handleEditProfileClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>

        {activeModal && (
          <>
            <div className="modal-overlay" onClick={closeActiveModal}></div>
            {activeModal === "register" && (
              <RegisterModal
                isOpen={true}
                handleRegister={handleRegister}
                isLoading={isLoading}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
                handleLoginClick={handleLoginClick}
              />
            )}

            {activeModal === "login" && (
              <LoginModal
                isOpen={true}
                handleLogin={handleLogin}
                isLoading={isLoading}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
              />
            )}
            {activeModal === "add-garment" && (
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onClose={closeActiveModal}
                onAddItemModalSubmit={handleAddItemModalSubmit}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                isOpen={activeModal === "preview"}
                card={selectedCard}
                onClose={closeActiveModal}
                selectedCard={selectedCard}
                onSelectCard={setSelectedCard}
                onDeleteClick={handleDeleteCard}
              />
            )}
            {activeModal === "delete-modal" && (
              <DeleteModal
                isOpen={activeModal === "delete-modal"}
                card={selectedCard}
                onClose={closeActiveModal}
                selectedCard={selectedCard}
                onSelectCard={setSelectedCard}
                onDeleteClick={handleDeleteCard}
              />
            )}
            {activeModal === "edit-modal" && (
              <EditProfileModal
                isOpen={activeModal === "edit-modal"}
                onClose={closeActiveModal}
                handleEditProfile={handleEditProfile}
              />
            )}
          </>
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
