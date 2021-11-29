import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">MENU</span>
        <img
          src="https://www.freddiepauls.com/wp-content/uploads/2021/09/2Freddie-Pauls-Dinner-Menu-092221-3.jpg"
          alt=""
        />
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>

      <li className="sidebarTitle" to="/employeeLogin">
        <Link className="link">
          Employee Login
        </Link>
      </li>
     
    </div>
  );
}
