import axios from 'axios';
import React, { Component } from 'react';


class Appointment extends Component {

    constructor(props) {
        super(props);
        this.state = {

            formvalue: {
                usersData: [],
                fullName: "",
                contactNumber: "",
                email: "",
                date: "",
                time: "",
                message: ""
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
        axios.get('http://localhost:8080/docAPI/details')
            .then(response => this.setState({ doctorsData: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })
        console.log(this.state.doctorsData)
    }

    handleSubmit = event => {
        event.preventDefault();
        this.submitRegister();

    }

    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const { formvalue } = this.state;
        this.setState({ formvalue: { ...formvalue, [name]: value } });
        this.validate(event);
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
                <div className="card">

                    <div className="modal-body" role="document">
                        <h3 className="modal-title text-center card-header" id="modalRequestLabel"><h3><b>Make an Appointment</b></h3></h3>
                        <div className="modal-content modal-body">

                            <div class="modal-body">
                                <form >
                                    <div className="form-group">

                                        <input type="text" className="form-control" id="appointment_name" placeholder="Full Name" name="fullName" onChange={this.handeChange} value={this.state.formvalue.fullName} />
                                    </div>
                                    {this.state.formerrorMessage.name ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.name}</span>
                                    ) : null}

                                    <div className="form-group">

                                        <input type="text" className="form-control" id="appointment_email" placeholder="Email" onChange={this.handeChange} name="email" value={this.state.formvalue.email} />
                                    </div>
                                    {this.state.formerrorMessage.email ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.email}</span>
                                    ) : null}

                                    <div className="form-group ">
                                        <input id="contactNumber" className="form-control required" type="tel" onChange={this.handeChange} placeholder="Contact number" name="contactNumber" value={this.state.formvalue.contactNumber}>
                                        </input>
                                    </div>

                                    {this.state.formerrorMessage.contactNumber ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.contactNumber}</span>
                                    ) : null}

                                    {/* {this.state.doctorsData.map(data => {
                                        <option value="">{data.doctorName}</option>
                                    })} */}
                                    <div className="form-group">
                                        <div className="select-wrap">
                                            <select name="" id="" className="required form-control" placeholder="Select Doctor">
                                                {this.state.doctorsData.map(data=>{
                                                    <option value="">{data.doctorName}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="date" className="form-control appointment_date" placeholder="Date" onChange={this.handeChange} name="date" value={this.state.formvalue.date} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">

                                                <input type="time" className="form-control appointment_time" placeholder="Time" onChange={this.handeChange} name="time" value={this.state.formvalue.time} />
                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <textarea name="" id="appointment_message" className="form-control" cols="30" rows="10" placeholder="Message" name="message" value={this.state.formvalue.message} ></textarea>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" value="" onSubmit={this.handleSubmit} className="btn btn-primary" >Make a Appointment</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        )
    }
}

export default Appointment;
