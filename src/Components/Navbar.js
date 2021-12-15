import React, { Component } from "react";
import { useState } from "react";
import "../index.css";
import "../css/css/menu.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";

import Login from "../Components/Login"
import Register from "../Components/Register";
import Home from "../Components/Home";
import { MenuData } from "./MenuData";
import Appointment from "./Appointment";



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
    };

    confirm_logout = () => {
        this.setState({ dialog_visible: true })
    };

    showSidebar = () => {
        this.setState({ sideNav: !this.state.sideNav });
    }
    render() {
        return (

            <div className="App-background">
                <Router>

                    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    {this.state.logged_userId ? (
                        <button className="menu-bars" onClick={this.showSidebar}><ImIcons.ImMenu /></button>
                        ) : null}
                    
                        <div class="container">
                        
                            <a class="navbar-brand" href="index.html"><b>e</b>-xult</a>

                            <div class="collapse navbar-collapse" id="ftco-nav">
                                <ul class="navbar-nav ml-auto">
                                    <li className="nav-item active cta"><Link className="nav-link" to="/">Home</Link></li>
                                    <li className="nav-item cta"><a href="about.html" className="nav-link">About</a></li>
                                    <li className="nav-item cta"><a href="services.html" className="nav-link">Services</a></li>
                                    <li className="nav-item cta"><a href="doctors.html" className="nav-link">Doctors</a></li>
                                    <li className="nav-item cta"><a href="blog.html" className="nav-link">Blog</a></li>
                                    <li className="nav-item cta"><a href="contact.html" className="nav-link">Contact</a></li>
                                    <li className="nav-item cta"><Link href="contact.html" className="nav-link" to="/appointment"><span>Make an Appointment</span></Link></li>
                                    {!this.state.logged_userId ? (
                                        <li className="nav-item cta"><Link className="nav-link" to="/Login"><b>Log In</b></Link></li>
                                    ) : null}

                                    {this.state.logged_userId ? (
                                        <li className="nav-item cta"><Link className="nav-link" onClick={this.logout} to="/"><b>Log out</b></Link></li>
                                    ) : null}

                                    {this.state.logged_userId ? (
                                        <li className="nav-item cta"><Link className="nav-link" to="">Welcome {this.state.logged_userName}</Link></li>
                                    ) : null}
                                </ul>
                            </div>
                        </div>
                        
                    </nav>

                    {this.state.sideNav ?
                        <div>
                           
                            <nav className={this.state.sideNav ? 'nav-menu active navbar-m' : 'nav-menu navbar-m'}>
                            
                                <ul className='nav-menu-item'>
                                    
                                    {MenuData.map((item, index) => {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <Link to={item.path} className="">
                                                    {item.icon}
                                                    <span><h6>{item.title}</h6></span>
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
                            <Route path="/appointment" component={Appointment}></Route>
                        </Switch>

                    </div>
                </Router>
            </div>
        );
    };
};

export default NavBar;

