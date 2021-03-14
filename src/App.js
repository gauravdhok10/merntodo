import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,Switch,Route
} from "react-router-dom";

import Register from "./pages/register";
import Welcome from "./pages/welcome";
import Login from "./pages/login";

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
       <CredentialsContext.Provider value={credentialsState}>
      <Router>
      <Switch>
        <Route exact path="/"><Welcome/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/login"><Login/></Route>
      </Switch>
      </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
