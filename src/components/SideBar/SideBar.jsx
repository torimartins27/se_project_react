import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container">
          <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
          <p className="sidebar__username">Terrence Tegegne</p>
        </div>
      </div>
    </>
  );
}

export default SideBar;
