import axios from 'axios';
import React, { Component } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import { Modal, ModalDialog } from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { PatDetails } from './PatientData';






import Calendar from './Calendar';
import moment from "moment";




export default class ViewAppointments extends Component {

    constructor(props) {
        super(props);
        this.state = {

            aptData: [],

            doctorsData: [],

            formvalue: {
                aptId:"",
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
                aptId:this.state.formvalue.aptId,
                aptPatient: sessionStorage.getItem("userId"),
                aptDoctor: this.state.formvalue.aptDoctorId,
                aptTime: this.state.formvalue.aptTime,
                aptDate: this.state.formvalue.aptDate,
                aptStatus: this.state.formvalue.aptStatus
            }

            this.setState({ errorMessage: "", successMessage: "" });

            console.log(aptData);

            axios.post('http://localhost:8080/aptAPI/editApt/'+this.state.formvalue.aptId, aptData)
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

        {this.state.aptData.map((val,key) => {
            if(val.aptId == event.target.value){
                console.log(val)
                this.setState({ formvalue: { ...formvalue, aptId : val.aptId , aptPatient : val.aptPatient, aptStatus : val.aptStatus} })
            }
        })}
        
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
            })).catch(error => {
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                } else {
                    this.setState({ errorMessage: "Server is down", successMessage: "" });
                }
            });
        window.location.reload(true)
    }

    alertshow = () => {
        alert("button clicked");
    };

    render() {

        return (

            <div className='App-header'>

                <div className='card container-fluid ' style={{ marginTop: "70px", width: "100%" }} >

                    <label className='text-center card-header' style={{ width: "100%" }}><b>Appointments</b></label>


                    <Table className='table form-control '>

                        <Tbody>

                            <Tr className="row">

                                {this.state.aptData.map((val, key) => {

                                    return (

                                        <div className='col-auto'>

                                            <Td className='card  row' style={{}}>

                                                <label className='text-center card-header' style={{ background: "rgba(255,200,100,0.8)", width: "100%", marginTop: "-0" }}><b>Appointment</b></label>

                                                <div className='card-body'>
                                                    <div className=''>

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
                                                        <div className='row' >


                                                            <div className='form-control  col'>
                                                                {sessionStorage.getItem("userId") < 10 ?
                                                                    <button className='btn btn-success' >Accept</button>
                                                                    :
                                                                    <button className='btn btn-danger' onClick={this.handleAptCancel} value={val.aptId}>Cancel</button>}
                                                            </div>

                                                            <div className='form-control col'>
                                                                {sessionStorage.getItem("userId") < 10 ?
                                                                    <button className='btn btn-danger '>Decline</button>
                                                                    :
                                                                    <button className='btn btn-info' onClick={this.handleAptUpdate} value={val.aptId}>Edit</button>}
                                                            </div>

                                                        </div>

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

