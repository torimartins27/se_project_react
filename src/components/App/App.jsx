import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureContext";
import AddItemModal from "../AddItemModal/AddItemModal";

import { defaultClothingItems } from "../../utils/constants";
import { getItems } from "../../utils/api";
import { postItem } from "../../utils/api";
import { deleteItem } from "../../utils/api";

function App() {
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

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, image, weather }) => {
    const newItem = {
      name,
      imageUrl: image,
      weather,
    };

    postItem(newItem)
      .then((dbItem) => {
        setClothingItems((prevItems) => [dbItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard(null); // Clear the selected card after successful deletion
      })
      .catch((err) => {
        console.error("Error deleting the item:", err);
      })
      .finally(() => {
        setActiveModal(""); // Close the modal regardless of the outcome
      });
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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page_content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          </div>
          <Routes>
            <Route
              path=""
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        {activeModal && (
          <>
            <div className="modal-overlay" onClick={closeActiveModal}></div>
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
          </>
        )}
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
