import "./posts.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Posts() {
  const { user } = useContext(Context);
  return (
    <div className="posts">
      <div className="postItem">
        <span className="postTitle">BOOK TABLE RESERVATIONS</span>
        {!user ? (
          <div className="postListButton">
            <button className="postButton">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </button>
            <span>or</span>
            <button className="postButton">
              <Link className="link" to="/book">
                BOOK AS GUEST
              </Link>
            </button>
          </div>
        ) : (
          <div className="postListButton">
            <button className="postButton">
              <Link className="link" to="/book">
                BOOK A TABLE
              </Link>
            </button>
          </div>
        )}
      </div>
      <span className="aboutUs">ABOUT US</span>
      <p className="aboutUsDesc">
        At 4351's Steakhouse, we're serving up more than steak. In fact, Famous
        Pork Chop is one of our unexpected steakhouse specialties. Our signature
        recipe, that we have perfected for more than four decades, is rubbed
        with a secret blend of seasonings, cured and roasted on a rotisserie
        with pecan wood for up to six hours before it's topped with signature
        herb-garlic butter, then carved tableside.
      </p>
    </div>
  );
}
