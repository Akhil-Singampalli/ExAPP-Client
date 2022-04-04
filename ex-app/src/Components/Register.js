import { toBeVisible } from "@testing-library/jest-dom/dist/matchers";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { User } from "./models/User";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

            formvalue: {
                usersData: [],
                fname: "",
                lname: "",
                contactNumber: "",
                email: "",
                password: "",
                confirmPassword: ""
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
            successMessage: "",
            errorMessage: "",
            login: false,
            register : false
        };
    }


    submitRegister = () => {

        let userData = {
            patientName: this.state.formvalue.fname + ' ' + this.state.formvalue.lname,
            emailId: this.state.formvalue.email,
            contactNumber: this.state.formvalue.contactNumber,
            password: this.state.formvalue.password
        }

        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname")
        var emailId = document.getElementById("email").value;
        var contactNumber = document.getElementById("contactNumber").value;
        var password = document.getElementById("password").value;

        var user = new User();

        user.name = firstname + ' ' + lastname ;
        user.contactNumber = contactNumber;
        user.emailId = emailId;
        user.password = password;

        this.setState({ errorMessage: "", successMessage: "" });

        console.log(this.state.formvalue.password);
        console.log(this.state.formvalue.confirmPassword);
        if (this.state.formvalue.password === this.state.formvalue.confirmPassword) {

            axios.post('http://localhost:8080/patientAPI/patientRegister', userData)
                .then(response => this.setState({

                    usersData: response.data,
                    successMessage: "Registration Successfull !!",
                    errorMessage: "",
                    buttonActive: false,
                    login: true
                })).catch(error => {
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, buttonActive: false, successMessage: "" });
                    } else {
                        this.setState({ errorMessage: "Server is down", buttonActive: false, successMessage: "" });
                    }
                });
        } else {
            this.setState({ errorMessage: "Password didn't match",buttonActive: false, })
        }

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
            case "fname":
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

            case "lname":
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
            case "password":

                if (value === "") {
                    validationerrorMessage.password = "Enter the field";
                    formvalid.password = false;
                }
                else if (!value.match(/^[A-Z]+$/) && !value.match(/^.[a-z].$/) && !value.match(/^.[0-9].$/) && value.length < 8) {

                    // var regexCap = new RegExp(/^.[A-Z].$/);
                    // var regexLow = new RegExp(/^.[a-z].$/);
                    // var regexNum = new RegExp(/^.[0-9].$/);

                    // if(!value.match(/^.[A-Z].$/)){
                    //     validationerrorMessage.password = "Password Should contain 1 upper case letter";
                    //     formvalid.password = false;
                    // }else if(!value.match(regexLow)){
                    //     validationerrorMessage.password = "Password Should contain 1 lower case letter";
                    //     formvalid.password = false;
                    // }else if(!value.match(regexNum)){
                    //     validationerrorMessage.password = "Password Should contain atleast 1 number";
                    //     formvalid.password = false;
                    // }else if(value.length<8){
                    //     validationerrorMessage.password = "Password Should contain atleast 8 characters";
                    //     formvalid.password = false;
                    // }
                    validationerrorMessage.password = `*Password Should contain atleast 1 upper case, 1 lower case,1 number and minimum 8 characters`;
                    formvalid.password = false;
                }
                else {
                    validationerrorMessage.password = "";
                    formvalid.password = true;
                }
                break;
            default:
                break;
        }
        console.log(formvalid)
        formvalid.buttonActive = formvalid.name && formvalid.email && formvalid.contactNumber && formvalid.password ;
        this.setState({ formerrorMessage: validationerrorMessage, formvalid: formvalid, successMessage: "" });
    }

    render() {
        // if(this.state.register)  return <Redirect to={"/login"} />
        return (
            <div className="App-header"  >
                
                <div >
                    <br></br>
                    <div className='card container-fluid' style={{ marginTop: "70px" }}>
                        <form className="form-control">
                        
                                    <h1 className="text-center card-header"><h3><b>Register</b></h3></h1>
                                
                            <div className="card-body">
                                
                                <div className="form-group form-col">

                                    <input id="firstname" className=" input-name" onChange={this.handeChange} placeholder="First Name" name="fname" value={this.state.formvalue.fname}>
                                    </input>
                                    <input id="lastname" className="input-name" onChange={this.handeChange} name="lname" placeholder="Last Name" value={this.state.formvalue.lname}>
                                    </input>

                                </div>
                                <div className="">
                                    {this.state.formerrorMessage.name ? (
                                        <span className="text alert-warning">{this.state.formerrorMessage.name}</span>
                                    ) : null}
                                </div>
                                <div className="">

                                      <div className="form-group form-control-sm">
                                        <input id="contactNumber" type="tel" onChange={this.handeChange} placeholder="Enter your contact number" name="contactNumber" value={this.state.formvalue.contactNumber}>
                                        </input>
                                    </div>
                                    {this.state.formerrorMessage.contactNumber ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.contactNumber}</span>
                                    ) : null}

                                    <div className="form-group form-control-sm">
                                        <input id="email" type="email" onChange={this.handeChange} placeholder="Email" name="email" value={this.state.formvalue.email}>
                                        </input>
                                    </div>

                                    {this.state.formerrorMessage.email ? (
                                        <span className="text-center alert-warning">{this.state.formerrorMessage.email}</span>
                                    ) : null}

                                    <div className="form-group form-control-sm">
                                        <input id="password" type="password" onChange={this.handeChange} placeholder="Password" name="password" value={this.state.formvalue.password}>
                                        </input>
                                    </div>

                                    {this.state.formerrorMessage.password ? (
                                        <span className="text-center alert-warning-small">{this.state.formerrorMessage.password}</span>
                                    ) : null}

                                    <div className="form-group form-control-sm">
                                        <input id="confirmPassword" type="password" onChange={this.handeChange} placeholder="Confirm Password" name="confirmPassword" value={this.state.formvalue.confirmPassword}>
                                        </input>
                                    </div>
                                        {console.log(this.state.formvalid.buttonActive)}
                                    <button
                                        type=
                                        "submit"
                                        className="btn btn-success"
                                        onClick={this.handleSubmit}
                                        disabled={!this.state.formvalid.buttonActive}>
                                        <b>Register</b>
                                    </button>
                                </div>
                                <span type="text" className="alert-info" >{this.state.errorMessage}</span>
                                <span type="text" className="alert-success" >{this.state.successMessage}</span>
                            </div>
                            <div className="text text-center small">
                                Already have an account?<Link className="text-center" to="/Login">
                                    <b>Sign in</b>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;