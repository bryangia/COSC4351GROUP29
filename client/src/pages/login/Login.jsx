import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginTitle">Login</h1>

        <div className="formInput">
          <label className="label">Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your username..."
            ref={usernameRef}
          />
        </div>

        <div className="formInput">
          <label className="label">Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
        </div>

        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Wrong credentials!!
        </span>
      )}
    </div>
  );
}
