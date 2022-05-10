import React, { Component, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

import SimpleImageSlider from "react-simple-image-slider"
import { gapi } from 'gapi-script'
// import ApiCalendar from 'react-google-calendar-api'

import { images } from "../utils/ImagesData";
import axios from "axios";
// import { start } from "@popperjs/core";
import GDrive from "./GDrive";
import DriveLogOut from "./DriveLogout";
import DriveLogin from "./DriveLogin"
import Drive from "./Drive";
import SMS from "./SMSnootificationManager";




class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fileObj: {
                mobileNo :""
            },
            accessToken: '',


        };
    }

    sms = () => {
        SMS(this.state.fileObj);
    }

    
    render() {
        return (
            <div className="App-header">


                <div className="card container-fluid" style={{ marginTop: "75px", width: "100%" }}>
                    <SimpleImageSlider
                        className="container-fluid"
                        width="98%"
                        height="85%"
                        images={images}
                        showBullets={true}
                        showNavs={true}

                    />

                </div>
                <div>
                    {/* <DriveLogin /> <DriveLogOut/> */}
                    {/* <GDrive /> */}
                    {/* <Drive /> */}
                    {/* <img src="https://drive.google.com/uc?export=view&id=1eG9rA3T74NG69AoZkNXSyfnoXvMpD9_K" alt="emo"></img> */}
                    <button className="btn" onClick={this.sms} >Send</button>
                   
                </div>
            

            </div>
        )

    }
}
export default Home;