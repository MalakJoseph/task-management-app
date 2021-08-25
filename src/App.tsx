import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { debounce } from "lodash";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./components/SignUp";

function App() {
  const [windowWidth, setWindowWidth] = React.useState(0);

  let resizeWindow = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 100);

  React.useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [resizeWindow]);

  let isMobileScreen = windowWidth <= 768;

  return (
    <>
      {isMobileScreen ? (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <SignUp />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      ) : (
        <h3>Please open in mobile screen size</h3>
      )}
    </>
  );
}

export default App;
