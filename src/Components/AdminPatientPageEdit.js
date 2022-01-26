import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import { Modal, ModalDialog } from 'react-bootstrap';
import { PatientData } from './PatientData';
import { fieldType,Field } from './models/FieldDetails';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default class AdminPatientPageEdit extends Component {

    constructor(props) {
        super(props);
        this.tempPatData = []
        this.state = {
            field: {
                FieldType: "",
                FieldName: "",
                FieldValue: ""
            },
            patdata : [],
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
            showFieldEdit: false
        };
        
    }

    componentDidMount () {
        this.tempPatData=PatientData;
    }
    

    submitTemplate = () => {
        axios.post('http://localhost:8080/adminAPI/patTempEdt', PatientData)
            .then(response => this.setState({

                usersData: response.data,
                successMessage: "Submit Successfull !!",
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
    

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        const { field } = this.state;
        this.setState({ field: { ...field, [name]: value } });
    }

    handleShowAddField = () => {
        this.setState({ showFieldEdit: true })
    }

    handleCloseAddField = () => {
        this.setState({ showFieldEdit: false })
    }
    handleAddField = () =>{
        
        // console.log(temp);
        const newField = {
            fieldName : this.state.field.fieldName,
            fieldType : this.state.field.fieldType,
            fieldValue : this.state.field.fieldValue
        }
        // this.setState(prevState => ({tempPatData : [...prevState.tempPatData, prevState.field ] }));
        // this.setState({tempPatData : this.state.tempPatData.concat(newField)});
        this.tempPatData = PatientData.concat(newField);
        console.log(this.tempPatData);
        // this.setState({ showFieldEdit: false })
    }

    render() {

        return (
            <div className="App-header"  >
                <div >
                    <br></br>
                    <div className="body-page">


                        <div className={true ? 'card card-body' : 'nav-menu navbar-m'}>

                            <ul className='nav-menu-item'>

                                {this.tempPatData.map((item, index) => {
                                    return (
                                        <div>
                                            <h6>{sessionStorage.getItem("userName")}</h6>
                                            <div key={index} className="form-control form-control-l">
                                                <label className='form-group'><span><h6>{item.fieldName}</h6></span></label>
                                                <input id={item.fieldName} type={item.fieldType} onChange={this.handeChange} placeholder={item.fieldName} name={item.fieldName} value="" >

                                                </input>
                                            </div>
                                        </div>
                                    )
                                })}
                            </ul>
                            <button
                                type="submit"
                                className="btn btn-info"
                                onClick={this.handleShowAddField}>
                                <b>Add Field</b>
                            </button>

                        </div>


                        <div className='ft-modal'>
                            <Modal show={this.state.showFieldEdit} onHide={this.handleCloseAddField}>
                                <Modal.Header closeButton>
                                    <Modal.Title >
                                        Field Details
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body >

                                    <div className='container' style={{ backgroundColor: "#0000 ", padding: "0.5rem" }}>

                                        <React.Fragment>
                                            <form>
                                                <div className="form-control" >

                                                   
                                                        <label ><span><h6>Choose Field Name</h6></span></label>
                                                        <input type="text"
                                                            className="form-control form-item"
                                                            style={{ padding: "1rem" }}
                                                            id="FieldName"
                                                            placeholder="Field Name"
                                                            name="FieldName" onChange={this.handleChange}
                                                            value={this.state.field.FieldName} />

                                                        <label ><span><h6>Choose Field Value</h6></span></label>
                                                        <input type="text"
                                                            className="form-control form-item"
                                                            style={{ padding: "1rem" }}
                                                            id="FieldValue"
                                                            placeholder="Field Value"
                                                            name="FieldValue" onChange={this.handleChange}
                                                            value={this.state.field.FieldValue} />

                                                        <div className="form-control">
                                                            <div className="select-wrap">
                                                                <label ><span><h6>Choose Field Type</h6></span></label>
                                                                <Dropdown options={fieldType} onClick={this.handleChange} name="FieldType" value={this.state.field.FieldType} placeholder="Select Field Type" />
                                                            </div>

                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-success col"
                                                            onClick={this.handleAddField}>
                                                            <b>Add</b>
                                                        </button>
                                                </div>
                                            </form>

                                        </React.Fragment>

                                    </div>

                                </Modal.Body>
                            </Modal>
                        </div>

                        <button
                            type=
                            "submit"
                            className="btn-register"
                            onClick={this.submitTemplate}>
                            <b>Submit</b>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
