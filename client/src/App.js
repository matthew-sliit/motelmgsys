import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components
import Register from "./Components/Register"
import Login from "./Components/Login";
import Profile from "./Components/Profile";
//admin components
import EmployeeRecruitment from "./Components/Administrator/EmployeeRecruitment";
import EmployeeAccountMg from "./Components/Administrator/EmployeeAccountMg";
import UserNavigationFormat from "./Components/Navigation/UserNavigationFormat";
import Dashboard from "./Components/Administrator/Dashboard";
import AdminNavigations from "./Components/Administrator/AdminNavigations";
//extra
import UserPageLayout from "./Components/UserPageLayout";
import Cookie from "js-cookie";
function App() {
    const role = Cookie.get('role');
    const profileNavigations = AdminNavigations();
    return <Router>
        <Switch>
            <Route exact path={"/login"}>
                <Login/>
            </Route>
            <Route exact path={"/register"}>
                <Register/>
            </Route>
            <Route exact path={"/admin"}>
                <UserNavigationFormat navigations={AdminNavigations()} content={<Dashboard/>} type={"Administrator"}/>
            </Route>
            <Route exact path={"/admin/recruitments"}>
                <UserNavigationFormat navigations={AdminNavigations()} content={<EmployeeRecruitment/>} type={"Administrator"}/>
            </Route>
            <Route exact path={"/admin/uac"}>
                <UserNavigationFormat navigations={AdminNavigations()} content={<EmployeeAccountMg/>} type={"Administrator"}/>
            </Route>
            <Route exact path={"/admin-recruitments"}>
                <UserNavigationFormat navigations={AdminNavigations()} content={<EmployeeRecruitment/>} type={"Administrator"}/>
            </Route>
            <Route exact path={"/profile"}>
                <UserNavigationFormat navigations={profileNavigations} content={<Profile/>} type={role}/>
            </Route>
            <Route exact path={"/user"}>
                <UserPageLayout/>
            </Route>
            <Route exact path={"/"}>
                <button className={"btn btn-outline-primary mt-3"} onClick={()=>window.location.href="/register"}>register</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/login"}>Login</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/user"}>User Page Layout</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/admin"}>Admin</button>
            </Route>
        </Switch>
    </Router>
}

export default App;
