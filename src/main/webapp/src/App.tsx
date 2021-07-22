import React from 'react';
import { ExternalUserView } from './views/externalUser/ExternalUserView';
import Login from "./views/institutionUser/login/Login";
//import {Router} from "@material-ui/icons";
import {BrowserRouter as Router, Redirect, Route, useHistory} from "react-router-dom";
//import SignIn from "./views/SignIn";

function App() {
  return (
    <Router>
        <div className="App">
            <Route path="/" exact component={ExternalUserView} />
            <Route path="/login" exact component={Login} />
        </div>
    </Router>

  );
}

export default App;
