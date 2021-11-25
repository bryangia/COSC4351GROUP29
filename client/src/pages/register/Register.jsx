import "./register.css";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [preferPayment, setPreferPayment] = useState("cash");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username,
        fullName,
        mailingAddress,
        billingAddress,
        preferPayment,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {}
  };

  const lastCheck = () => {
    if (check === true) {
      setBillingAddress(mailingAddress);
    }
  };

  const [check, setCheck] = useState("false");

  const handleBilling = () => {
    check === true ? setCheck(false) : setCheck(true);
    // if (check === true) {
    //   setCheck(false);
    // } else {
    //   setCheck(true);
    //   setBillingAddress(mailingAddress);
    // }
  };

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1 className="registerTitle">Register</h1>

        <div className="formInput">
          <label className="label">Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Username"
            pattern="^[A-Za-z0-9]{3,16}$"
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="errMessage">
            Username should be 3-16 characters and shouldn't include any special
            characters!
          </span>
        </div>

        <div className="formInput">
          <label className="label">Full Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Full Name"
            pattern="^[a-zA-Z'-'\s]{3,}$"
            required={true}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="errMessage">
            Full Name shouldn't include any numbers or special characters!
          </span>
        </div>

        <div className="formInput">
          <label className="label">Mailing Address</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Mailing Address"
            pattern="^^[#.0-9a-zA-Z\s,-]+$"
            required={true}
            value={mailingAddress}
            onChange={(e) => setMailingAddress(e.target.value)}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="errMessage">
            Mailing Address should be included number, street name, city, state,
            and zip code!
          </span>
        </div>

        <div className="checkbox">
          <input type="checkbox" onClick={() => handleBilling()} />
          <label className="billingTitle">
            Check if Billing same as Mailing
          </label>
        </div>

        <div className="formInput">
          <label className="label">Billing Address</label>
          <input
            disabled={check === true ? true : false}
            className="registerInput"
            type="text"
            placeholder="Billing Address"
            pattern="^^[#.0-9a-zA-Z\s,-]+$"
            required={true}
            value={check === true ? mailingAddress : billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="errMessage">
            Biling Address should be included number, street name, city, state,
            and zip code!
          </span>
        </div>

        <div className="formInput">
          <label className="label">Preferred Payment</label>
          <select
            className="registerInput"
            value={preferPayment}
            required={true}
            onChange={(e) => setPreferPayment(e.target.value)}
            onBlur={handleFocus}
            focused={focused.toString()}
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="check">Check</option>
          </select>
        </div>

        <div className="formInput">
          <label className="label">Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
          />
          <span className="errMessage">
            Password should be 8-20 characters and include at least 1 number, 1
            uppercase and 1 lowercase letter!
          </span>
        </div>
        <button
          className="registerButton"
          type="submit"
          onClick={(e) => lastCheck()}
        >
          Register
        </button>
      </form>
    </div>
  );
}
