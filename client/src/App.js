import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components
import Register from "./Components/Register"
import Login from "./Components/Login";
import Profile from "./Components/Profile";
//admin components
import EmployeeRecruitment from "./Components/Administrator/EmployeeRecruitment";
import EmployeeAccountMg from "./Components/Administrator/EmployeeAccountMg";
import Dashboard from "./Components/Administrator/Dashboard";
import AdminNavigations from "./Components/Administrator/AdminNavigations";
//reservation manager components
import RDashboard from "./Components/ReservationManager/RDashboard";
//maintenance manager components
import MDashboard from "./Components/MaintenanceManager/MDashboard";
//bar manager components
import BDashboard from "./Components/BarManager/BDashboard";
import BarNavigations from "./Components/BarManager/BarNavigations";
import AddDrink from "./Components/BarManager/AddDrink";
import EditReservations from "./Components/ReservationManager/EditReservations";
//extra
import UserPageLayout from "./Components/UserPageLayout";
import UserNavigationFormat from "./Components/Navigation/UserNavigationFormat";
import BackendHomeFormat from "./Components/Home/BackendHomeFormat";

import Cookie from "js-cookie";
import ReservationNavigations from "./Components/ReservationManager/ReservationNavigation";
function App() {
    const role = Cookie.get('role');
    const profileNavigations = AdminNavigations();
    return <Router>
        <Switch>
            <Route exact path={"/login"}>
                <BackendHomeFormat content={<Login/>}/>
            </Route>
            <Route exact path={"/register"}>
                <BackendHomeFormat content={<Register/>}/>
            </Route>
            <Route exact path={"/profile"}>
                <UserNavigationFormat navigations={profileNavigations} content={<Profile/>} type={role}/>
            </Route>
            {/* ============== ADMINISTRATOR ======================*/}
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
            {/* ============== RESERVATION MANAGER ==================*/}
            <Route exact path={"/reserve"}>
                <UserNavigationFormat navigations={ReservationNavigations()} content={<RDashboard/>} type={"Reservation Manager"}/>
            </Route>
            <Route exact path={"/reserve/edit"}>
                <UserNavigationFormat navigations={ReservationNavigations()} content={<EditReservations/>} type={"Reservation Manager"}/>
            </Route>
            {/* ============== MAINTENANCE MANAGER ==================*/}
            <Route exact path={"/maintainer"}>
                <UserNavigationFormat navigations={BarNavigations()} content={<MDashboard/>} type={"Maintenance Manager"}/>
            </Route>
            {/* =================== BAR MANAGER =====================*/}
            <Route exact path={"/bar"}>
                <UserNavigationFormat navigations={BarNavigations()} content={<BDashboard/>} type={"Bar Manager"}/>
            </Route>
            <Route exact path={"/bar/new"}>
                <UserNavigationFormat navigations={BarNavigations()} content={<AddDrink/>} type={"Bar Manager"}/>
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
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/reserve"}>Reservation Manager</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/maintainer"}>Maintenance Manager</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/bar"}>Bar Manager</button>
                <br/>
                <button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="http://localhost:3000/motelhome/index.html"}>Home</button>
            </Route>
        </Switch>
    </Router>
}

export default App;
