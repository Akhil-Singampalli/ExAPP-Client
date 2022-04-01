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




class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fileObj: '',
            accessToken: '',


        };
    }

   

        componentDidUpdate () {
            // this.cal(
        }

        handleNewEvent = (time) => {
            console.log(time.availableTimeslot.startTime)
            // gapi.load('client:auth2', () => {
            //     console.log('loaded client')
               
            // })
            function start() {
    
            gapi.client.init({
                apiKey: "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI",
                clientId: "229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com",
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar.events",
            })
            .then(function () {
                return gapi.client.request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/singampalliakhil@gmail.com/events`
                });
            }).then(() => {
                let start = new Date(time.startTime.getTime())
                let end = new Date();
                end.setTime(start.getTime() + (14*60000))
                console.log(end)
                // this.setState({start: start , end : end})  
                // console.log(this.state.start)          
    
                    var event = {
                        'summary': 'Appointment Request',
                        'location': 'Exult Clinic,Siripuram',
                        'description': 'Regular Visit',
                        'start': {
                            'dateTime': start,
                            'timeZone': 'IST'
                        },
                        'end': {
                            'dateTime': end,
                            'timeZone': 'IST'
                        },
                        'attendees': [
                            { 'email': "exultclinic00@gmail.com" },
                            { 'email': "bsurya1998@gmail.com" }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }
    
                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'srinudr71@gmail.com',
                        'resource': event,
                    })
    
                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })
    
                })
            }
                gapi.load("client", start);
        }
    
    

    


    render() {
        return (
            <div className="App-header">


                <div className="card container-fluid" style={{ marginTop: "75px", width: "100%" }}>
                    {/* <SimpleImageSlider
                        className="container-fluid"
                        width="98%"
                        height="85%"
                        images={images}
                        showBullets={true}
                        showNavs={true}

                    /> */}

                </div>
                <div>
                    {/* <DriveLogin /> <DriveLogOut/> */}
                    {/* <GDrive /> */}
                    {/* <Drive /> */}
                    {/* <img src="https://drive.google.com/uc?export=view&id=1eG9rA3T74NG69AoZkNXSyfnoXvMpD9_K" alt="emo"></img> */}
                    {/* <button className="btn" onClick={this.calendar} >calendar</button> */}
                   
                </div>
            

            </div>
        )

    }
}
export default Home;