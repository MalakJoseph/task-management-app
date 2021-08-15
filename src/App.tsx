import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";

function App() {
  const mobileScreen = window.innerWidth <= 425;

  const [isMobileScreen, setIsMobileScreen] = React.useState(() =>
    mobileScreen ? true : false
  );

  window.addEventListener("resize", () => {
    if (mobileScreen) {
      setIsMobileScreen(true);
    } else {
      setIsMobileScreen(false);
    }
  });

  return (
    <>
      {isMobileScreen ? (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
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
