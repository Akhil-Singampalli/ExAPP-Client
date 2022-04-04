import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import moment from "moment";
import 'react-dropdown/style.css';
import { Redirect } from 'react-router-dom';
import Calendar from './Calendar';




export default class Appointment extends Component {

    constructor(props) {
        super(props);
        this.state = {

            doctorsData: [],

            patient: {},

            aptData: [],
            availableTimeslots: [],

            formvalue: {
                aptPatientId: "",
                aptDoctorId: "",
                aptTime: "",
                aptDate: "",
                aptStatus: "Pending",
            },
            formerrorMessage: {
                name: "",
                email: "",
                contactNumber: "",
                password: ""
            },
            formvalid: {
                name: false,
                email: false,
                contactNumber: false,
                password: false,
                buttonActive: false
            },

            doctorMail: "",
            patientMail: sessionStorage.getItem("emailId"),

            successMessage: "",
            errorMessage: "",
            login: false
        };
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails = () => {
        let urlD = "http://localhost:8080/docAPI/details";
        axios.get(urlD)
            .then(response => this.setState({ doctorsData: response.data }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })

        var urlP = "http://localhost:8080/patientAPI/patient/" + this.props.match.params.patientId;
        console.log(urlP)

        axios.get(urlP)
            .then(response => this.setState({ patient: response.data }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })

    }

    SubmitAppointment = () => {
        console.log((this.state.formvalue.aptDate).toString())
        if(this.state.formvalue.aptDate != '' && this.state.formvalue.aptTime != ''){

            let aptData = {
                aptPatient: this.props.match.params.patientId,
                aptDoctor: this.state.formvalue.aptDoctorId,
                aptTime: this.state.formvalue.aptTime,
                aptDate: this.state.formvalue.aptDate,
                aptStatus: "Pending"
            }
    
            this.setState({ errorMessage: "", successMessage: "" });
    
            console.log(aptData);
    
            axios.post('http://localhost:8080/aptAPI/bookApt', aptData)
                .then(response => this.setState({
    
                    aptData: response.data,
                    successMessage: "Appointment Request Submitted Successfull !!",
                    errorMessage: "",
                    login: true
                })).catch(error => {
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                    } else {
                        this.setState({ errorMessage: "Server is down", successMessage: "" });
                    }
                });
        }
       
    }


    handleSubmit = event => {
        event.preventDefault();
        this.SubmitAppointment();

    }

    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const { formvalue } = this.state;
        this.setState({ formvalue: { ...formvalue, [name]: value } },
            () => {
                if (event.target.id == "doc") {

                    this.state.doctorsData.map((doctor, key) => {

                        if (doctor.doctorId == value) {

                            this.setState({ doctorMail: doctor.emailId })
                        }

                    })

                }
            }
        );
        this.validate(event);

    }

    handleCallback = (startTime) => {
        console.log(startTime)
        const { formvalue } = this.state;
        
         this.setState({formvalue:{ ...formvalue,aptTime: moment(startTime).format('HH:mm'), aptDate: moment(startTime).format("DD-MM-YYYY")}  })
    console.log(this.state.formvalue)
        }

    calendar = (event) => {
    //     console.log(this.state.doctorMail)
    //  var {doctorMail} = this.state
    //   this.setState({ doctorMail : event.target.value})

      return (
          <div>
              <Calendar timeCallback={this.handleCallback}  doc={this.state.doctorMail} pat={this.state.patientMail} />
          </div>
      )
  
    }
    

    validate = event => {
        var fieldName = event.target.name;
        var value = event.target.value;
        var validationerrorMessage = this.state.formerrorMessage;
        var formvalid = this.state.formvalid;
        switch (fieldName) {
            case "fullName":
                if (value === "") {
                    validationerrorMessage.name = "Enter the field";
                    formvalid.name = false;
                }
                else if (!value.match(/^[A-Za-z]+$/)) {
                    validationerrorMessage.name = "Please enter your name in valid format";
                    formvalid.name = false;
                }
                else {
                    validationerrorMessage.name = "";
                    formvalid.name = true;
                }
                break;

            case "email":
                if (value === "") {
                    validationerrorMessage.email = "Enter the field";
                    formvalid.email = false;
                }
                else if (!value.match(/^[A-Za-z0-9]+[@][A-Za-z0-9]+[.][c][o][m]$/)) {
                    validationerrorMessage.email = "Please enter valid email";
                    formvalid.email = false;
                }
                else {
                    validationerrorMessage.email = "";
                    formvalid.email = true;
                }
                break;

            case "contactNumber":

                if (value === "") {
                    validationerrorMessage.contactNumber = "Enter the field";
                    formvalid.contactNumber = false;
                }
                else if (!value.match(/^[6-9][0-9]{9}$/)) {
                    validationerrorMessage.contactNumber = "Please enter valid Indian Number";
                    formvalid.contactNumber = false;
                }
                else {
                    validationerrorMessage.contactNumber = "";
                    formvalid.contactNumber = true;
                }
                break;
            default:
                break;
        }
        formvalid.buttonActive = formvalid.name && formvalid.email && formvalid.contactNumber && formvalid.password;
        this.setState({ formerrorMessage: validationerrorMessage, formvalid: formvalid, successMessage: "" });
    }


    render() {
        return (

            <div className="App-header">
                {this.props.match.params.patientId ? null : <Redirect to={"/Register"} ></Redirect>}
                <div className='card container-fluid' style={{ marginTop: "70px" , width:"70%"}}>
                    <div className="modal-body" role="document">
                        <h3 className="modal-title text-center card-header" id="modalRequestLabel" style={{ width: "100%" }}><b>Make an Appointment</b></h3>
                        <div className="modal-content modal-body">

                            <div className="modal-body">
                                <form className='form' onSubmit={this.handleSubmit} >
                                    <div className="form-group">

                                        <input type="text" className="form-control hidden" id="appointment_name" placeholder={this.state.patient.patientName} name="aptPatientId" onChange={this.handeChange} value={this.state.formvalue.aptPatientId} />
                                    </div>
                                    {this.state.formerrorMessage.name ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.name}</span>
                                    ) : null}

                                    <div className="form-group">

                                        <input type="text" className="form-control" id="appointment_email" placeholder={this.state.patient.emailId} onChange={this.handeChange} name="email" value={this.state.formvalue.email} />
                                    </div>
                                    {this.state.formerrorMessage.email ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.email}</span>
                                    ) : null}

                                    <div className="form-group ">
                                        <input id="contactNumber" className="form-control required" type="tel" onChange={this.handeChange} placeholder={this.state.patient.contactNumber} name="contactNumber" value={this.state.formvalue.contactNumber}>
                                        </input>
                                    </div>

                                    {this.state.formerrorMessage.contactNumber ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.contactNumber}</span>
                                    ) : null}


                                    <div className="form-group">
                                        <div className="select-wrap ">
                                            <div className='row'>
                                        {/* <label className='form-item' style={{ padding: '0.5rem' }}><h6><b>Choose Doctor : </b></h6></label> */}
                                            <select name="aptDoctorId" id="doc" className="form-control col" onClick={this.handeChange}  placeholder="Select Doctor">
                                            <option disabled selected defaultValue={""} value> ----- Choose Doctor -----  </option>
                                                {this.state.doctorsData.map((doctor, key) => {
                                                        
                                                    return (
                                                        
                                                        <option id={key} value={doctor.doctorId} >{doctor.doctorName}</option>
                                                        
                                                    )

                                                })}
                                            </select>
                                            </div>
                                            
                                            
                                            
                                            <div className="" >
                                            <div className="form-group">

                                            {/* <Calendar timeCallback={this.handleCallback}  doc={this.state.doctorMail} pat={this.state.patientMail} /> */}

                                             </div>
                                        </div>
                                    </div>

                                    </div>

                                    {/* <div className="form-group">
                                        <textarea name="" id="appointment_message" className="form-control" cols="30" rows="5" placeholder="Message" name="message" value={this.state.formvalue.message} ></textarea>
                                    </div> */}
                                </form>
                                {this.calendar()}
                                
                                <div className="form-group">
                                        <button type="submit" value="" className="btn btn-primary" onClick={this.handleSubmit}><b>Book Appointment</b></button>

                                        <h6 type="text" className="alert-info" >{this.state.errorMessage}</h6>
                                        <h6 type="text" className="alert-success" >{this.state.successMessage}</h6>
                                    </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        )
    }
}


