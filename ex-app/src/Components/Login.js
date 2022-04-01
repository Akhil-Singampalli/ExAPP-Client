import {User} from "./models/User";
import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../index.css";
import "../App.css";


class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            successMessage: "",
            register: false,
            login: false,
            cancel:false,
           
            formvalue: {
                contactNumber: "",
                password: ""
            },
            formerrorMessage: {
                contactNumber: "",
                password: ""
            },
            formvalid: {
                contactNumber: false,
                password: false,
                buttonActive: false
            },
            successMessage:"",
            errorMessage:""
        };
    }
    

    loginSubmit = () => {
        const user = new User();
        user.contactNumber = this.state.formvalue.contactNumber;
        user.password = this.state.formvalue.password;
        
        let LoginForm = {
            contactNumber : this.state.formvalue.contactNumber,
            password : this.state.formvalue.password
        }
        axios.post('http://localhost:8080/loginAPI/login',LoginForm)
        .then(response => { this.setState({
 
            register: false,
            login: true,
            successMessage: "Welcome"+response.data.name
            
        })
        sessionStorage.setItem("userName",response.data.userName);
        sessionStorage.setItem("userId",response.data.userId);
        sessionStorage.setItem("contactNumber",response.data.contactNumber);
        sessionStorage.setItem("emailId",response.data.emailId);
        window.location.reload();
       
    }).catch(error=>{
            if(error.response) {
                this.setState({ errorMessage : error.response.data.message ,successMessage : "" });
            }else {
                this.setState({ errorMessage : "Server is down", successMessage : ""});
            }
        });

       
        };

    cancel=()=>{
        this.setState({cancel:true})
    }

    register= () =>{
        this.setState({register:true})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.loginSubmit();
      }

    handleChange = event => {
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
        }
    };

    render() {
        if (this.state.register == true) return <Redirect to={"/Register"} />;
        else if (this.state.login == true || this.state.cancel == true) return <Redirect to={"/"} />;
        return (
            <div>
                <div className="App-header" >
                    <section className='card container-fluid' style={{ marginTop: "70px" }}>
                        <form className="form-control card-body" >
                        <div className="text-center card-header">
                                    <h2><b>LOGIN</b></h2>
                                </div>
                            <div className="card-group">
                                <span className="form-control-sm">
                                    <input
                                        id="contactNumber"
                                        required
                                        type="tel"
                                        min="6000000000"
                                        max="9999999999"
                                        name="contactNumber"
                                        onChange={this.handleChange}
                                        className="form-group"
                                        placeholder="Contact Number"
                                        value={this.state.formvalue.contactNumber}
                                    />
                                   
                                </span>
                                {this.state.contactErrorMessage ? (
                                    <span className="text-center alert-warning">{this.state.contactErrorMessage}</span>
                                ) : null}
                            </div>
                            <div className="card-group">
                                <span className="form-control-sm">
                                    <input
                                        id="password"
                                        value={this.state.formvalue.password}
                                        required
                                        type="password"
                                        name="password"
                                        className=""
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                       
                                    />              
                                </span>
                                {this.state.passwordErrorMessage ? (
                                    <span
                                        severity="error"
                                        className="alert-warning"
                                        text={this.state.passwordErrorMessage}
                                    />
                                ) : null}
                            </div>
                            <br />
                            <div className="form-control-sm">
                                <div className="col" >
                                    <div className="form-inline row">
                                        <button
                                            type="submit" 
                                            name="login"
                                            className=" btn  btn-success"
                                            onClick={this.handleSubmit}
                                        >
                                          <b>Login</b>
                                        </button>
                                        <br></br>
                                        
                                        <button
                                            type="submit" value="cancel"
                                            className=" btn btn-secondary"
                                            onClick={this.cancel}
                                        >
                                           <b>Cancel</b> 
                                        </button>
                                    </div>
                                </div>
                                <br></br>
                                <button
                                    type="submit" name="register"
                                    className="btn btn-primary "
                                    onClick={this.register}
                                >
                                    <b>Register</b>
                                </button>
                            </div>
                        </form>
                        <span className="text-center alert-success"><b>{this.state.successMessage}</b></span>
                        <span className="text-center alert-danger"><b>{this.state.errorMessage}</b></span>
                    </section>
                    <section className="col"></section>
                </div>
            </div>
        );
    }
}


export default Login;