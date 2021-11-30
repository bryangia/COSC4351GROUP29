import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import EmployeeLogin from "./pages/employeeLogin/employeeLogin"
import Register from "./pages/register/Register";
import Book from "./pages/book/Book";
import ThankYou from "./pages/thankyou/Thankyou";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Home />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/thankyou">
          <ThankYou />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/employeeLogin">{user ? <Home /> : <EmployeeLogin />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
