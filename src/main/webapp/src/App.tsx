import React from 'react';
import { ExternalUserView } from './views/externalUser/ExternalUserView';
import Login from "./views/institutionUser/login/Login";
//import {Router} from "@material-ui/icons";
import {BrowserRouter as Router, Redirect, Route, useHistory, Link} from "react-router-dom";
import {InstitutionUserView} from "./views/institutionUser/InstitutionUserView";
//import SignIn from "./views/SignIn";
//<Route path="/" exact component={ExternalUserView} />

//<nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                 </ul>
//             </nav>

//<Route path="/login" exact component={Login} />
//             <Route path="/institution/:username" exact component={InstitutionUserView} />
//             <Route path="/logout" exact component={() => {
//                 localStorage.removeItem("user");
//                 return(<Redirect to="/" />)} }/>

function App() {
  return (
    <Router>
        <div className="App">
            <Route path="/" exact component={ExternalUserView} />
            <Route path="/login" exact component={Login} />
            <Route path="/institution/:username" exact component={InstitutionUserView} />
            <Route path="/logout" exact component={() => {
                 localStorage.removeItem("user");
                 return(<Redirect to="/" />)} }/>
            <Route path="/logoutExt" exact component={() => {
                localStorage.removeItem("user");
                return(<Redirect to="/login" />)} }/>
        </div>
    </Router>

  );
}

export default App;
