import axios from 'axios';
import React, { Component } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import { Modal, ModalDialog } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { PatDetails } from './PatientData';

import Calendar from './Calendar';
import moment from "moment";
import CreateGoogleEvent from './CreateEvent';





export default class ViewAppointments extends Component {

    constructor(props) {
        super(props);
        this.state = {

            aptData: [],

            doctorsData: [],

            formvalue: {
                aptId: "",
                aptPatientId: "",
                aptDoctorId: "",
                aptTime: "",
                aptDate: "",
                aptStatus: "Pending",
            },
            doctorMail: "",

            successMessage: "",
            errorMessage: "",
            login: false,
            showFieldEdit: false,
            showAptEdit: false,
            doctorsData: [],
            successMessage: "",
            errorMessage: "",
            login: false
        };
    }

    componentDidMount() {
        this.getDetails();

        console.log("here");
    }

    getDetails = () => {
        let url = "http://localhost:8080/aptAPI/getApt/" + this.props.match.params.userId
        axios.get(url)
            .then(response => this.setState({ aptData: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })

        let urlDoctor = "http://localhost:8080/docAPI/details";

        axios.get(urlDoctor)
            .then(response => this.setState({ doctorsData: response.data }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })



        if (sessionStorage.getItem("userId") == 1) {
            let url = "http://localhost:8080/aptAPI/getApts"
            axios.get(url)
                .then(response => this.setState({ aptData: response.data, errorMessage: "", successMessage: "success" }))
                .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })

        }
    }

    UpdateAppointment = () => {
        console.log((this.state.formvalue.aptDate).toString())
        if (this.state.formvalue.aptDate != '' && this.state.formvalue.aptTime != '') {

            let aptData = {
                aptId: this.state.formvalue.aptId,
                aptPatient: sessionStorage.getItem("userId"),
                aptDoctor: this.state.formvalue.aptDoctorId,
                aptTime: this.state.formvalue.aptTime,
                aptDate: this.state.formvalue.aptDate,
                aptStatus: this.state.formvalue.aptStatus
            }

            this.setState({ errorMessage: "", successMessage: "" });

            console.log(aptData);

            axios.post('http://localhost:8080/aptAPI/editApt/' + this.state.formvalue.aptId, aptData)
                .then(response => this.setState({

                    successMessage: "Appointment Request Submitted Successfull !!",
                    errorMessage: "",
                    showAptEdit: false
                })).catch(error => {
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                    } else {
                        this.setState({ errorMessage: "Server is down", successMessage: "" });
                    }
                });
        }
        window.location.reload(true)
    }

    handleSubmit = event => {
        event.preventDefault();
        this.UpdateAppointment();

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

        console.log(this.state.aptData);
        console.log(this.state.doctorMail)
    }

    handleCallback = (startTime) => {
        console.log(startTime)
        const { formvalue } = this.state;

        this.setState({ formvalue: { ...formvalue, aptTime: moment(startTime).format('HH:mm'), aptDate: moment(startTime).format("DD-MM-YYYY") } })
    }

    handleShowAptEdit = () => {
        this.setState({ showAptEdit: true })

    }

    handleCloseAptEdit = () => {
        this.setState({ showAptEdit: false })
    }

    handleAptUpdate = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const { formvalue } = this.state;

        {
            this.state.aptData.map((val, key) => {
                if (val.aptId == event.target.value) {
                    console.log(val)
                    this.setState({ formvalue: { ...formvalue, aptId: val.aptId, aptPatient: val.aptPatient, aptStatus: val.aptStatus } })
                }
            })
        }

        console.log(this.state.formvalue)

        this.handleShowAptEdit()
    }
    handleAptCancel = (event) => {
        console.log(event.target.value)
        let url = "http://localhost:8080/aptAPI/cancelApt/" + event.target.value
        axios.post(url)
            .then(response => this.setState({

                successMessage: "Canceled Successfully !!",
                errorMessage: "",
            }, () => {
                this.getDetails()
            })).catch(error => {
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                } else {
                    this.setState({ errorMessage: "Server is down", successMessage: "" });
                }
            });
        window.location.reload(true)
    }



    handleAddApointment = (event) => {
        console.log(event.target.value)

        CreateGoogleEvent(event.target.value)

        let url = "http://localhost:8080/aptAPI/confirmApt/" + event.target.value
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

        // window.location.reload(true)
    }

    handleSort = () => {
        this.state.aptData.sort((a, b) =>{ return new Date(b.aptDate,'DD-MM-YYYY') - new Date(a.aptDate,'DD-MM-YYYY') });
    }

    alertshow = () => {
        alert("button clicked");
    };

    render() {

        return (

            <div className='App-header'>

                <div className='card container-fluid ' style={{ marginTop: "70px", width: "100%" }} >

                    <label className='text-center card-header row' style={{ width: "100%" }}>
                        <b className='text-center col'>Appointments</b> 
                         
                    </label>
                    <div className='right form-control col-auto'>
                    <button className='btn btn-info col' style={{ padding: '0.5px' ,float : "right",width:"80px"}} onClick={this.handleSort}>Sort</button>
                    </div>
                    
                    <Table className='table form-control '>

                        <Tbody>

                            <Tr className="row">

                                {this.state.aptData.map((val, key) => {

                                    return (

                                        <div className=' col-auto'>

                                            <Td className='card' style={{}}>

                                                <label className='text-center card-header' style={{ background: "rgba(255,200,100,0.8)", width: "100%", marginTop: "-0" }}><b>Appointment</b></label>

                                                <div className='card-body'>
                                                    <div className='form-control'>

                                                        <div>
                                                            {sessionStorage.getItem("userId") == 1 || sessionStorage.getItem("userId") < 10 ?
                                                                <div className='form form-group text-center'><h6><b>Patient Name : </b>{val.aptPatient}</h6></div>
                                                                :
                                                                null
                                                            }

                                                            {sessionStorage.getItem("userId") == 1 || sessionStorage.getItem("userId") > 10 ?
                                                                <div className='form form-group text-center'><h6><b>Doctor Name : </b>{val.aptDoctor}</h6></div>
                                                                :
                                                                null
                                                            }
                                                        </div>

                                                        <div className='form form-group text-center'><h6><b>Appointment Date : </b>{val.aptDate}</h6></div>
                                                        <div className='form form-group text-center'><h6><b>Appointment Time : </b>{val.aptTime}</h6></div>
                                                        <div className='form form-group text-center'><h6><b>Status : </b> {val.aptStatus}</h6></div>


                                                        {val.aptStatus != "Confirm" ?

                                                            <>
                                                                {sessionStorage.getItem("userId") < 10 && sessionStorage.getItem("userId") != 1 ?
                                                                    <div className='col'>
                                                                        <button className='btn btn-success col-auto' onClick={this.handleAddApointment} value={val.aptId}>Accept</button>
                                                                        <button className='btn btn-danger col-auto' onClick={this.handleAptCancel} value={val.aptId}>Decline</button>
                                                                    </div>
                                                                    :
                                                                    null
                                                                }



                                                                {sessionStorage.getItem("userId") > 10 ?
                                                                    <div className='row'>
                                                                        <button className='btn btn-danger col-auto' onClick={this.handleAptCancel} value={val.aptId}>Cancel</button>
                                                                        <button className='btn btn-info col' onClick={this.handleAptUpdate} value={val.aptId}>Edit</button>
                                                                    </div>
                                                                    :
                                                                    null
                                                                }


                                                                {sessionStorage.getItem('userId') == 1 ?

                                                                    <div className="row">
                                                                        <button className='btn btn-success col-auto' onClick={this.handleAddApointment} value={val.aptId}>Accept</button>
                                                                        <button className='btn btn-danger col-auto' onClick={this.handleAptCancel} value={val.aptId}>Decline</button>
                                                                        <button className='btn btn-info col' onClick={this.handleAptUpdate} value={val.aptId}>Edit</button>
                                                                    </div>
                                                                    : null
                                                                }
                                                            </>

                                                            : null}



                                                    </div>

                                                </div>
                                            </Td>
                                        </div>

                                    )
                                })
                                }

                            </Tr>

                        </Tbody>
                    </Table>

                </div>
                <div className='ft-modal' >
                    <Modal dialogClassName="custom-dialog" show={this.state.showAptEdit} onHide={this.handleCloseAptEdit} >
                        <Modal.Header closeButton>
                            <Modal.Title className='text-center'>
                                <b>Edit Appointment</b>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body  >

                            <div className='' style={{ backgroundColor: "#0000 ", padding: "0.5rem" }}>

                                <React.Fragment>


                                    <div className="form-control" >


                                        <div className="form-group">
                                            <div className="select-wrap ">
                                                <div className='row'>
                                                    {/* <label className='form-item' style={{ padding: '0.5rem' }}><h6><b>Choose Doctor : </b></h6></label> */}
                                                    <select name="aptDoctorId" id="doc" className="form-control col" onClick={this.handeChange} placeholder="Select Doctor">
                                                        <option disabled selected defaultValue={""} value> ----- Choose Doctor -----  </option>
                                                        {this.state.doctorsData.map((doctor, key) => {

                                                            return (

                                                                <option id={key} value={doctor.doctorId} mail={doctor.emailId}>{doctor.doctorName}</option>

                                                            )

                                                        })}
                                                    </select>
                                                </div>

                                                <Calendar timeCallback={this.handleCallback} doc={this.state.doctorMail} pat={this.state.patientMail} />

                                                <div className="form-group">
                                                    <button type="submit" value="" className="btn btn-primary" onClick={this.handleSubmit}><b>Book Appointment</b></button>

                                                    <h6 type="text" className="alert-info" >{this.state.errorMessage}</h6>
                                                    <h6 type="text" className="alert-success" >{this.state.successMessage}</h6>
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </React.Fragment>

                            </div>

                        </Modal.Body>
                    </Modal>
                </div>
            </div>

        )
    }
}

