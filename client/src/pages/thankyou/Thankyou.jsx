import React from "react";
import { Link } from "react-router-dom";
import "./thankyou.css";

export default function Thankyou() {
  return (
    <div className="thanks">
      <div className="thankItem">
        <span className="thankTitle">THANK YOU FOR YOUR RESERVATION!</span>
        <div className="thankListButton">
          <span className="postDes">
            Please check your email for for more details about your reservation.
            I hope you have a wonderful day!
          </span>
          <button className="thankButton">
            <Link className="link" to="/">
              Back to Homepage
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
