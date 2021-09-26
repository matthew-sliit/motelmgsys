import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import logo from '../src/assets/images/logo.png';
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
import EditReservations from "./Components/ReservationManager/EditReservations"
import ReservationNavigations from "./Components/ReservationManager/ReservationNavigation";
//maintenance manager components
import MDashboard from "./Components/MaintenanceManager/MDashboard";
//bar manager components
import BDashboard from "./Components/BarManager/BDashboard";
import BarNavigations from "./Components/BarManager/BarNavigations";
import AddDrink from "./Components/BarManager/AddDrink";
import DrinkMenu from "./Components/BarManager/DrinkMenu";
import EditDrink from "./Components/BarManager/EditDrink";

//extra
import UserPageLayout from "./Components/UserPageLayout";
import UserNavigationFormat from "./Components/Navigation/UserNavigationFormat";
import BackendHomeFormat from "./Components/Home/BackendHomeFormat";

import Cookie from "js-cookie";
import MMDashboard from "./Components/MaintenanceManager/MMDashboard";
import HDashboard from "./Components/MaintenanceManager/HDashboard";
import MaintenanceNavigations from "./Components/MaintenanceManager/MaintenanceNavigation";
import AddHousekeeping from "./Components/MaintenanceManager/AddHousekeeping";
import AddMaintenance from "./Components/MaintenanceManager/AddMaintenance";
import EditMaintenance from "./Components/MaintenanceManager/EditMaintenance";
import EditHousekeeping from "./Components/MaintenanceManager/EditHousekeeping";
import AddBurger from "./Components/BurgerJoint/AddBurger";
import BJNavigations from "./Components/BurgerJoint/BJNavigation";
import BJDashboard from "./Components/BurgerJoint/BJDashboard";
import EditBurger from "./Components/BurgerJoint/EditBurger";
import BurgerMenu from "./Components/BurgerJoint/BurgerMenu";
import React from "react";


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
            <Route exact path={"/admin/view-reserve"}>
                <UserNavigationFormat navigations={AdminNavigations()} content={<RDashboard/>} type={"Administrator"}/>
            </Route>
            {/* ============== RESERVATION MANAGER ==================*/}
            <Route exact path={"/reserve"}>
                <UserNavigationFormat navigations={ReservationNavigations()} content={<RDashboard/>} type={"Reservation Manager"}/>
            </Route>
            <Route exact path={"/reserve/edit/:id"}>
                <UserNavigationFormat navigations={ReservationNavigations()} content={<EditReservations/>} type={"Reservation Manager"}/>
            </Route>
            {/* ============== MAINTENANCE MANAGER ==================*/}
            <Route exact path={"/maintainer"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<MMDashboard/>} type={"Maintenance Manager"}/>
            </Route>
            <Route exact path={"/maintainer/maintenance"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<MDashboard/>} type={"Maintenance Manager"}/>
            </Route>
            <Route exact path={"/maintainer/housekeeping"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<HDashboard/>} type={"Maintenance Manager"}/>
            </Route>
            <Route exact path={"/maintainer/maintenance/add"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<AddMaintenance/>} type={"Maintenance Manager"}/>
            </Route>
            <Route exact path={"/maintainer/housekeeping/add"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<AddHousekeeping/>} type={"Maintenance Manager"}/>
            </Route>
            <Route exact path={"/maintainer/maintenance/edit/:id"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<EditMaintenance/>} type={"Maintenance Manager"}/>
            </Route>
            <Route exact path={"/maintainer/housekeeping/edit/:id"}>
                <UserNavigationFormat navigations={MaintenanceNavigations()} content={<EditHousekeeping/>} type={"Maintenance Manager"}/>
            </Route>
            {/* =================== BAR MANAGER =====================*/}
            <Route exact path={"/bar"}>
                <UserNavigationFormat navigations={BarNavigations()} content={<BDashboard/>} type={"Bar Manager"}/>
            </Route>
            <Route exact path={"/bar/new"}>
                <UserNavigationFormat navigations={BarNavigations()} content={<AddDrink/>} type={"Bar Manager"}/>
            </Route>
            <Route exact path={"/bar/menu"}>
                <UserNavigationFormat navigations={BarNavigations()} content={<DrinkMenu/>} type={"Bar Manager"}/>
            </Route>
            <Route path={"/bar/edit/:id"}>
            <UserNavigationFormat navigations={BarNavigations()} content={<EditDrink/>} type={"Bar Manager"}/>
            </Route>
            <Route exact path={"/bar/edit"}>
            <UserNavigationFormat navigations={BarNavigations()} content={<EditDrink/>} type={"Bar Manager"}/>
            </Route>

            {/* =================== BURGER JOINT =====================*/}
            <Route exact path={"/joint"}>
                <UserNavigationFormat navigations={BJNavigations()} content={<BJDashboard/>} type={"Burger Joint"}/>
            </Route>
            <Route exact path={"/joint/new"}>
                <UserNavigationFormat navigations={BJNavigations()} content={<AddBurger/>} type={"Burger Joint"}/>
            </Route>
            <Route exact path={"/joint/menu"}>
                <UserNavigationFormat navigations={BJNavigations()} content={<BurgerMenu/>} type={"Burger Joint"}/>
            </Route>
            <Route exact path={"/joint/edit"}>
                <UserNavigationFormat navigations={BJNavigations()} content={<EditBurger/>} type={"Burger Joint"}/>
            </Route>
            {/*
            <Route exact path={"/"}>
                <BackendHomeFormat content={<Login/>}/>
            </Route>
            */}
            <Route exact path={"/"}>
                <div className="container">
                    <br/><br/>
                    <center>
                        <img src={logo} style={{width:"200px"}}/>
                        <h2 className="text-primary"><b>Motel Management System</b></h2>
                    </center>
                   <br/><br/><br/><br/>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}} onClick={()=>window.location.href="/register"}>
                                <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center">
                                            <center>
                                                <i className="fa fa-user-plus text-primary f-36"></i>
                                            </center>
                                            <br/><br/>
                                            <center><h3>Register</h3></center>
                                            <br/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}} onClick={()=>window.location.href="/login"}>
                                <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center">
                                            <center>
                                                <i className="fa fa-sign-in-alt text-primary f-36"></i>
                                            </center>
                                            <br/><br/>
                                            <center><h3>Login</h3></center>
                                            <br/>
                                        </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}}
                                 onClick={()=>window.location.href="http://localhost:3000/motelhome/index.html"}>
                                <div className="card-block border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <center>
                                            <i className="fa fa-home text-primary f-36"></i>
                                        </center>
                                        <br/><br/>
                                        <center><h3>Home</h3></center>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}} onClick={()=>window.location.href="/admin"}>
                                <div className="card-block border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <center>
                                            <i className="fa fa-user-cog text-primary f-36"></i>
                                        </center>
                                        <br/><br/>
                                        <center><h3>Admin</h3></center>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}} onClick={()=>window.location.href="/reserve"}>
                                <div className="card-block border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fa fa-desktop text-primary f-36"></i>
                                        </div>
                                        <br/><br/>
                                            <center><h3>Reservation Management</h3></center>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}} onClick={()=>window.location.href="/maintainer"}>
                                <div className="card-block border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fa fa-toolbox text-primary f-36"></i>
                                        </div>
                                        <br/><br/>
                                            <center><h3>Maintenance Management</h3></center>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}}
                                 onClick={()=>window.location.href="/bar"}>
                                <div className="card-block border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fa fa-wine-glass text-primary f-36"></i>
                                        </div>
                                        <br/><br/>
                                            <center><h3>Bar<br/> Management</h3></center>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-social" style={{backgroundColor:"#e7feff"}}
                                 onClick={()=>window.location.href="/joint"}>
                                <div className="card-block border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <center>
                                            <i className="fa fa-utensils text-primary f-36"></i>
                                        </center>
                                        <br/><br/>
                                            <center><h3>Burger <br/>Joint</h3></center>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*<button className={"btn btn-outline-primary mt-3"} onClick={()=>window.location.href="/register"}>register</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/login"}>Login</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/user"}>User Page Layout</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/admin"}>Admin</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/reserve"}>Reservation Manager</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/maintainer"}>Maintenance Manager</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/bar"}>Bar Manager</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="/joint"}>Burger Joint</button>*/}
                {/*<br/>*/}
                {/*<button className={"btn btn-outline-primary mt-1"} onClick={()=>window.location.href="http://localhost:3000/motelhome/index.html"}>Home</button>*/}
            </Route>
        </Switch>
    </Router>
}

export default App;
