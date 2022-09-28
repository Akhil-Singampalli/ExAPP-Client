import axios from 'axios';
import React, { Component } from 'react';
import moment from "moment";
import { gapi } from 'gapi-script';
import { getApt_URL,confirmApt_URL} from "../utils/URL";

export default function UpdateGoogleEvent (Id) {
    
        
        // this.state = {
            
        //    aptStatusCode:''

        // }

        let urlApt = getApt_URL + Id;

        axios.get(urlApt)
            .then(response =>   addEvent(response.data) )
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })
    

    let addEvent = (data) => {

        gapi.load('client:auth2', () => {
            console.log('loaded client')


            gapi.client.load('client', () => console.log('bam!'))

            gapi.client.init({
                apiKey: "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI",
                clientId: "229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com",
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar.events"
            }).then(
                gapi.client.load('calendar', 'v3', () => console.log('bam!')),

                gapi.auth2.getAuthInstance().signIn()

            ).then(() => {

                    console.log(data.aptDate)
                    let time = moment(moment(data.aptDate,"MM-DD-YYYY").format("DD-MM-YYYY") + ' ' + data.aptTime)
                    // let start = moment(data.aptDate + ' ' + data.aptTime)
                    
                    let start = new Date(moment(data.aptDate,"MM-DD-YYYY").format("DD-MM-YYYY") + ' ' + data.aptTime)
                    
                    console.log(start)
                    let end = new Date();
                    end.setTime(start.getTime() + (15 * 60000))
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
                            { 'email': data.aptPatient },
                            { 'email': data.aptDoctor }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    var request = gapi.client.calendar.events.patch({
                        'calendarId': data.aptDoctor,
                        'resource': event,
                    })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                        if(event === 200){
                            let url = confirmApt_URL + event.target.value
                            axios.put(url)
                                .then(response => this.setState({
                    
                                    successMessage: "Confirmed Successfully !!",
                                    errorMessage: "",
                                })).catch(error => {
                                    if (error.response) {
                                        this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                                    } else {
                                        this.setState({ errorMessage: "Server is down", successMessage: "" });
                                    }
                                });
                        }
                        
                    })


                })



        })
    }



}