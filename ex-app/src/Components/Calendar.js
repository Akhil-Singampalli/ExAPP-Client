import React, { Component } from "react";
import moment from "moment";

import { gapi } from 'gapi-script';
import { ScheduleMeeting } from 'react-schedule-meeting';



export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format("ddd, Do MMMM, h:mm A"),
            events: [],
            isBusy: false,
            isEmpty: false,
            docMail: this.props.doc,
            patMail: this.props.pat,
            date: "",
            start: "",
            end: "",
            count: 0,
            stateDoc:true,
            dayAvailability: true,

            okSlots: [],

            availableTimeslots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
                return {
                    id,
                    startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
                    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
                };
            })
        }
    };


    slotsAvailability = () => {

        for (let id = 0; id <= 9; id++) {

            var newDate = moment().add(id, 'days')
            // console.log(newDate)

            this.setState({ date: newDate })

            this.getEvents(newDate, id)

            this.handleNewSlots()
        }
        return this.state.availableTimeslots

    }
    handleNewSlots  ()  {
        this.setState({ availableTimeslots: this.state.okSlots });
        this.setState({ okSlots: [],stateDoc : true });
    }

    getEvents = (date, id) => {
        // console.log(this.state.docMail)
        var doc = this.state.docMail

        date = moment(date).format("YYYY-MM-DD")
        // console.log(date)
        let that = this;
        function start() {
            gapi.client
                .init({
                    apiKey: "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI"
                })
                .then(function () {
                    return gapi.client.request({
                        path: `https://www.googleapis.com/calendar/v3/calendars/${doc}/events?maxResults=11&orderBy=updated&timeMin=${moment(date).startOf('day').toISOString()}&timeMax=${moment(date).endOf('day').toISOString()}`
                    });
                })
                .then(
                    response => {
                        // console.log(response);
                        that.setState({ count: that.state.count + 1 })

                        let events = response.result.items;
                        // console.log(events)
                        let sortedEvents = events.sort(function (a, b) {
                            return (
                                moment(b.start.dateTime).format("YYYYMMDD") -
                                moment(a.start.dateTime).format("YYYYMMDD")
                            );
                        });
                        // console.log(sortedEvents);

                        if (events.length > 0) {
                            that.setState(
                                {
                                    events: sortedEvents,

                                }, (count) => {

                                    that.setSlots(id)
                                }

                                // that.setStatus();   
                            );

                        } else {
                            that.setState({
                                isBusy: false,
                                isEmpty: true,
                                isLoading: false
                            }, (count) => {
                                that.freeDay(id)
                            }
                            )

                        }
                    },
                    function () {
                        let slots = this.state.okSlots
                        this.setState({ okSlots: [] })
                        
                        this.setState({ availableTimeslots: slots })
                        // console.log(slots)
                    },
                    function (reason) {
                        console.log(reason)
                    }
                );
        }
        gapi.load("client", start);
    }


    setSlots = (id) => {

        let slots = this.state.okSlots

        var events = this.state.events;
        // console.log(events);

        let busyhours = ['09:00', '21:00']              //bussiness hours 9:00 to 21:00
        // id = moment(this.state.date, 'YYYY-MM-DD').diff(moment().format("YYYY-MM-DD"), 'days')

        for (var e = 0; e < events.length; e++) {
            var eventItem = events[e];
            // console.log(moment(eventItem.start.dateTime).format("hh"))
            busyhours.push(moment(eventItem.start.dateTime).format("HH:mm"));
            busyhours.push(moment(eventItem.end.dateTime).format("HH:mm"));
        }

        busyhours = [...new Set(busyhours)];        //remove duplicates
        busyhours.sort();

        //  


        for (let t = 0; t < busyhours.length; t += 2) {
            // console.log(busyhours[t])
            let j = busyhours[t];
            let t1 = j.split(":");
            let k = busyhours[t + 1];
            let t2 = k.split(":");

            while (moment(k, "HH:mm").diff(moment(j, "HH:mm"), 'minutes') == 15) {
                t = t + 1
                j = busyhours[t]
                t1 = j.split(":");

                k = busyhours[t + 1]
                t2 = k.split(":");
                // console.log(busyhours[t])

            }

            slots.push({
                "id": id,
                "startTime": new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(parseInt(t1[0]), parseInt(t1[1]), 0, 0)),
                "endTime": new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(parseInt(t2[0]), parseInt(t2[1]), 0, 0)),
            })

        }

        // console.log(slots)
        slots.sort(function (a, b) { return a.id - b.id })

        this.setState({ okSlots: slots })
        // console.log(slots)

        if (this.state.count == 10) {
            this.setState({ okSlots: [] })
            // console.log(slots)
            this.setState({ availableTimeslots: slots ,count : 0})

        }

    }

    freeDay = (id) => {

        let slots = this.state.okSlots

        slots.push({
            "id": id,
            "startTime": new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
            "endTime": new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(21, 0, 0, 0)),
        })

        slots.sort(function (a, b) { return (a.id - b.id) })

        this.setState({ okSlots: slots })
        // console.log(this.state.count)
        if (this.state.count == 10) {
            this.setState({ okSlots: [] })
            // console.log(slots)
            this.setState({ availableTimeslots: slots , count : 0})

        }

    }

    CreateEvent = (time) => {
        
        console.log(time)
        let start = new Date(time.getTime())
        let end = new Date();
        end.setTime(start.getTime() + (15 * 60000))
        // console.log(start)
        this.onTrigger(start)
        
    }


    componentDidMount() {

        this.setState({ date: moment().format("YYYY-MM-DD") })
        this.setState({ docMail: this.props.doc })
        // this.slotsAvailability();

        
        // console.log(this.props.doc)
        // console.log(this.props.pat)

    };

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps)
        // console.log(prevState)
        if(nextProps.doc != prevState.docMail && nextProps.doc != undefined) {
          return {stateDoc : false, docMail : nextProps.doc};
        }
      }

    handleChange(e){
        console.log("change")
        var {doctorMail} = e.target;
        this.setState({
          docMail : doctorMail
        },() => this.props.newValue(doctorMail));
      }

    tick = () => {
        let time = moment().format("dddd, Do MMMM, h:mm A");
        this.setState({
            time: time
        });
    };

    setStatus = () => {
        let now = moment();
        let events = this.state.events;
        for (var e = 0; e < events.length; e++) {
            var eventItem = events[e];
            if (
                moment(now).isBetween(
                    moment(eventItem.start.dateTime),
                    moment(eventItem.end.dateTime)
                )
            ) {
                this.setState({
                    isBusy: true
                });
                return false;
            } else {
                this.setState({
                    isBusy: false
                });
            }
        }
    };

    onTrigger = (start) => {
        console.log(moment(start,"dddd, Do MMMM, h:mm A"))

        this.props.timeCallback(start);

    }

    checkDayAvailability = (day) => {

        this.setState({ date: moment(day, 'YYYY-MM-DD') })

        this.slotsAvailability()
    }

    render() {

        if(!this.state.stateDoc){
            {this.slotsAvailability()}
        }
        
        // const { time, events } = this.state;


        // let eventsList = events.map(function (event) {
        //     return (
        //         <label
        //             className="list-group-item"
        //             // href={event.htmlLink
        //             target="_blank"
        //             key={event.id}
        //         >
        //             {event.summary}{" "}
        //             <span className="badge">
        //                 {moment(event.start.dateTime).format("h:mm a")},{" "}
        //                 {moment(event.end.dateTime).diff(
        //                     moment(event.start.dateTime),
        //                     "minutes"
        //                 )}{" "}
        //                 minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
        //             </span>
        //         </label>
        //     );
        // });

        // let emptyState = (
        //     <div className="empty">
        //         {/* <img src="./image" alt="Welcome" /> */}
        //         <h6>
        //             No meetings are scheduled for the day. Create one by clicking the
        //             button below.
        //         </h6>
        //     </div>
        // );



        return (
            <div className='form-control container-fluid ' style={{ marginTop: "70px", width: "98%" }}>

                <ScheduleMeeting

                    borderRadius={10}
                    primaryColor="green"
                    eventDurationInMinutes={15}
                    availableTimeslots={this.state.availableTimeslots}
                    
                    onStartTimeSelect={
                        // console.log
                        (startTimeEventEmit) => {
                        // this.handeChange(startTimeEventEmit)
                        // this.handleNewEvent(startTimeEventEmit)
                        // startTimeEventEmit.preventDefault()
                        this.onTrigger(startTimeEventEmit.startTime)
                            
                        // console.log(startTimeEventEmit)
                    }
                }
                // onStartTimeSelect={console.log}
                />

                {/* <div className="form-group">
                    <h4 style={this.state.isBusy ? { color: "red" } : { color: "green" }} ><b>{this.state.isBusy ? "BUSY" : "OPEN"}</b></h4>
                </div>
                <div className="upcoming-meetings">
                    <div className="current-time">{time}</div>
                    <label>Available Slots</label>
                    <div className="list-group">
                        {events.length > 0 && eventsList}
                        {this.state.isEmpty && emptyState}
                    </div>
                    <a
                        className="primary-cta"
                        href="https://calendar.google.com/calendar/u/0?cid=c2luZ2FtcGFsbGlha2hpbEBnbWFpbC5jb20"
                        target="_blank"
                    >
                        +
                    </a>
                </div> */}
            </div>
        );
    }
}