import axios from 'axios';
import React, { Component } from 'react';
import moment from "moment";
import { gapi } from 'gapi-script';
import { getApt_URL,confirmApt_URL} from "../utils/URL";

export default function CreateGoogleEvent (Id) {
    
        
      const setAptConfirm = (event,data) => {

         let url = confirmApt_URL + Id
                            console.log(data)
                            // console.log(event.htmlLink.toString())
                            // // "https://www.google.com/calendar/event?eid=b2FiYmRrdDZ2bmNuYWdkOW1kOW5rY204ZGsgc2luZ2FtcGFsbGlha2hpbEBt"
                            // var eid= event.htmlLink.toString().match('\/d\/(eid=.+)\/')
                            // console.log(eid)
                            let aptData = {
                                aptId: data.aptId,
                                aptPatient: data.aptPatient,
                                aptDoctor: data.aptDoctor,
                                aptTime: data.aptTime,
                                aptDate: data.aptDate,
                                aptStatus: event.htmlLink
                            }

                            axios.post(url,aptData)
                                .then(response =>console.log(response)).catch(error => {
                                    if (error.response) {
                                        console.log("Fail")
                                    } else {
                                        console.log("server down")
                                    }
                                });
      }

        let urlApt = getApt_URL + Id;

        axios.get(urlApt)
            .then(response =>   addEvent(response.data) )
            .catch(error => { if (error.response) console.log("error") })
    

    let addEvent = (data) => {

        gapi.load('client:auth2', () => {
            console.log('loaded client')


            gapi.client.load('client', () => console.log('bam!'))

            gapi.client.init({
                apiKey: "AIzaSyCr3hrrjQvtvj9Z5-slKS3XwSl55o9B17g",
                clientId: "693143304041-757ag2eaqnk82dl7l5fstcda62b9838j.apps.googleusercontent.com",
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

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': data.aptDoctor,
                        'resource': event,
                    })

                    request.execute(event => {
                        
                        
                            // let url = confirmApt_URL + Id
                            // console.log(event.htmlLink.toString())
                            // axios.put(url,null ,{params: { googleEvent : event.htmlLink.toString()}})
                            //     .then(response =>console.log(response)).catch(error => {
                            //         if (error.response) {
                            //             console.log("Fail")
                            //         } else {
                            //             console.log("server down")
                            //         }
                            //     });
                            console.log(event)
                            if(event === 200){
                                setAptConfirm(event,data)
                                window.open(event.htmlLink)
                            }                        
                        // return event.htmlLink.toString()
                        
                        
                    })

                })

        })
    }
}