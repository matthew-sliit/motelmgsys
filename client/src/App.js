import logo from './assets/svg/logo.svg';
//import './assets/css/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components
import Register from "./Components/Register"
import Login from "./Components/Login";
function App() {
    return <Router>
        <Switch>
            <Route exact path={"/login"}>
                <Login/>
            </Route>
            <Route exact path={"/register"}>
                <Register/>
            </Route>
            <Route exact path={"/"}>
                <button className={"btn btn-outline-primary mt-3"} onClick={()=>window.location.href="/register"}>register</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/login"}>Login</button>
            </Route>
        </Switch>
    </Router>
}

export default App;
