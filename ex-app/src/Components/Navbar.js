import React, { Component } from "react";



// import "../index.css";

import "../css/css/menu.css";


import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";

import Login from "../Components/Login"
import Register from "../Components/Register";
import Home from "../Components/Home";
import { MenuData, MenuDataAdmin, MenuDataDoc } from "../utils/MenuData";
import Appointment from "./Appointment";
import AdminPatientPageEdit from "./AdminPatientPageEdit";
import PatientDetails from "./PatientDetails";
import DocUpdatePatData from "./DocUpdatePatData";
import ContactUs from "./ContactUs";
import Services from "./Services";
import ViewAppointments from "./ViewAppointments";
import AdminAddDoctor from "./AdminAddDoctor";
import AdminAddPatsBulk from "./AdminAddPatsBulk";
import { Redirect } from "react-router-dom";
import AdminPatientDetailsEdit from "./AdminPatientDetailsEdit";
import Calendar from "./Calendar";
import "../utils/URL";





class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged_userId: sessionStorage.getItem("userId"),
            logged_userName: sessionStorage.getItem("userName"),
            dialog_visible: false,
            logged_out: false,
            sideNav: false
        };
    }

  

    componentDidMount() {
        this.setState({ sideNav: false });
        
        
    }
    onClick = () => {
        this.setState({ dialog_visible: true });
    }

    onHide = () => {
        this.setState({ dialog_visible: false });
    }

    logout = () => {
        this.setState({ dialog_visible: false });
        sessionStorage.clear();
        this.setState({ logged_out: true });
        window.location.reload();
        <Redirect to="/" ></Redirect>
    };

    confirm_logout = () => {
        this.setState({ dialog_visible: true })
        
    };

    toggleSidebar = () => {
        this.setState({ sideNav: !this.state.sideNav });
    }


    render() {
        return (

            <div className="App-background">
                
                <Router>
                
                {!this.state.logged_out ? <Redirect to="/" ></Redirect> : null }

                    <nav className="mainNav navbar navbar-expand-md navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                        {this.state.logged_userId ? (
                            <button className="menu-bars" onClick={this.toggleSidebar}><ImIcons.ImMenu /></button>
                        ) : null}

                        <div className="container-fluid">

                            <a className="navbar-brand" href="/" style={{marginLeft:"80px"}}><img src="/ExultLogo.png" width="130" height="60"></img></a>
                           

                            <div className="collapse navbar-collapse" id="ftco-nav">
                                <ul className="navbar-nav ml-auto col-auto" style={{padding:"0.2"}} >
                                    <li className="nav-item active cta "><Link className="nav-link" to="/">Home</Link></li>
                                    <li className="nav-item cta "><a href="about.html" className="nav-link">About</a></li>
                                    <li className="nav-item cta "><Link  className="nav-link" to="/services/">Services</Link></li>
                                    <li className="nav-item cta "><a href="doctors.html" className="nav-link">Doctors</a></li>
                                    <li className="nav-item cta "><a href="blog.html" className="nav-link">Blog</a></li>
                                    <li className="nav-item cta "><Link  className="nav-link" to="/contactus/">Contact</Link></li>
                                    {sessionStorage.getItem("userId") >= 1000 ? 
                                    <li className="nav-item cta "><Link  className="nav-link" to="/appointment/">Book Appointment</Link></li>
                                    : null}
                                    
                                    {!this.state.logged_userId ? (
                                        <li className="nav-item cta"><Link className="nav-link" to="/Login"><b>Log In</b></Link></li>
                                    ) : null}

                                    {this.state.logged_userId ? (
                                        <li className="nav-item cta"><Link className="nav-link" onClick={ this.logout} to="/"><b >Log out</b></Link></li>
                                    ) : null}

                                    {this.state.logged_userId ? (

                                        <li className="nav-item cta">

                                            <button className="menu-bars" style={{ marginTop: "0.5rem" }} onClick={this.logout}><ImIcons.ImUser /></button>
                                        </li>


                                    ) : null}


                                </ul>
                            </div>
                        </div>

                    </nav>

                    {this.state.sideNav && this.state.logged_userId > 10 ?
                        <div>


                            <nav className={this.state.sideNav ? 'nav-menu active' : 'nav-menu navbar-m'} style={{position:"relative" , float : 'left', height: "100%"}}>

                                <ul className='nav-item form-control'>

                                    {MenuData.map((item, index) => {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <Link to={item.path} onClick={this.toggleSidebar} className={item.cName}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </nav>
                        </div>
                        : null}


                    {this.state.sideNav && this.state.logged_userId < 10 && this.state.logged_userId > 1 ?
                        <div>

                            <nav className={this.state.sideNav ? 'nav-menu active' : 'nav-menu navbar-m'} style={{position:"relative" , float : 'left'}}>

                                <ul className='nav-item form-control'>

                                    {MenuDataDoc.map((item, index) => {
                                        return (
                                            <li key={index} onClick={this.toggleSidebar} className={item.cName}>
                                                <Link to={item.path} className="">
                                                    {item.icon}<span>{item.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </nav>
                        </div>
                        : null}

                    {this.state.sideNav && (this.state.logged_userId === "1")?
                        <div>

                            <nav className={this.state.sideNav ? 'nav-menu active ' : 'nav-menu navbar-m'} style={{position:"relative" , float : 'left'}}>

                                <ul className='nav-item form-control'>

                                    {MenuDataAdmin.map((item, index) => {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <Link to={item.path} onClick={this.toggleSidebar} className={item.cName}>
                                                    {item.icon}{ item.title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </nav>
                        </div>
                        : null}

                    <div>

                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route exact path="/Login" component={Login}></Route>
                            <Route path="/register" component={Register}></Route>
                            <Route path="/appointment/:patientId" component={Appointment}></Route>
                            <Route exact path="/details/:patientId" component={PatientDetails}></Route>
                            <Route path="/patientPageEdit" component={AdminPatientDetailsEdit}></Route>
                            <Route path="/addPatDetails" component={DocUpdatePatData}></Route>
                            <Route path="/getApt/:userId" component={ViewAppointments}></Route>
                            <Route path="/addDoc" component={AdminAddDoctor}></Route>
                            <Route path="/addPats" component={AdminAddPatsBulk}></Route>
                            <Route path="/cal" component={Calendar}></Route>
                            <Route path="/contactus" component={ContactUs}></Route>
                            <Route path="/services" component={Services}></Route>
                        </Switch>

                    </div>
                </Router>
            </div>
        );
    };
};

export default NavBar;

