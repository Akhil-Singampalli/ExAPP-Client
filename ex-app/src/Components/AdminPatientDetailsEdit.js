import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


import { Modal, ModalDialog } from 'react-bootstrap';
import { Type, Field } from './models/FieldDetails';
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd";
import * as AiIcons from "react-icons/ai";
import axios from 'axios';
import {patSampEdit_URL,patTempEdit_URL} from "../utils/URL";

import { images } from "../utils/ImagesData";


class AdminPatientDetailsEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            patData: [],
            field: {
                FieldType: "",
                FieldName: "",
                FieldValue: ""
            },
            showFieldEdit: false

        };
    }

    componentDidMount() {
        axios.get(patSampEdit_URL)
            .then(response => this.setState({ patData: response.data }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })

        console.log(this.state.patdata)
    }

    handleShowAddField = () => {
        this.setState({ showFieldEdit: true })
    }

    handleCloseAddField = () => {
        this.setState({ showFieldEdit: false })
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        const { field } = this.state;
        this.setState({ field: { ...field, [name]: value } });

        console.log(this.state.field)
    }

    submitTemplate = () => {
        axios.post(patTempEdit_URL, this.state.patData)
            .then(response => this.setState({
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

    handleDelete = event => {

        const { patData } = this.state;
        const id = event.target.id;


        this.setState({ patData: patData.filter(item => item.fieldId != id) });

    };

    handleAddField = () => {

        const { patData } = this.state;
        const newData = {
            fieldId: "1",
            fieldName: this.state.field.FieldName,
            fieldType: this.state.field.FieldType,
            fieldValue: this.state.field.FieldValue
        };


        this.setState({
            patData: [newData, ...patData],

        });

        this.handleCloseAddField();
    }

    render() {
        return (
            <div className="App-header"  >

                <div >
                    <div className='card container-fluid' style={{ marginTop: "70px" }}>
                        <div className='' style={{ width: "100%" }}>
                            <label className='card-header text-center' style={{ width: "100%" }}><b>Patients Details Page</b></label>
                        </div>

                        <div >
                            <ul className='card-body '>

                                {this.state.patData.map((item, index) => {
                                    return (

                                        <div className='form-control' key={index}>

                                            <div key={index} className="form-control-sm row" style={{ position: "left" }} >
                                                <Row >
                                                    <Col span={10} style={{ float : "left" }}>
                                                        <label className='form-item text-center' style={{ padding: '0.5rem',marginTop: '0.8rem' }}><b>{item.fieldName}</b></label>
                                                    </Col>
                                                    <Col style={{ float: "left",padding:"0.5rem" }} span={10}>
                                                        <input id={item.fieldId}
                                                            className="form-item"
                                                            type={item.fieldType}
                                                            onChange={this.handleChange}
                                                            placeholder={item.fieldName}
                                                            name={item.fieldName}
                                                            value={item.fieldValue}

                                                            disabled={sessionStorage.getItem("userId") < 10 ? true : false}
                                                        >
                                                        </input>
                                                    </Col>
                                                    <Col span={10} style={{ float : "left" }} >
                                                        <Button
                                                            id={item.fieldId}
                                                            className="btn btn-danger form-item"
                                                            type="delete"
                                                            theme="filled"
                                                            style={{ padding: '0.5rem',marginTop: '0.8rem'}}
                                                            onClick={this.handleDelete}
                                                        >
                                                            <AiIcons.AiFillDelete /></Button>
                                                    </Col>
                                                </Row>


                                            </div>




                                        </div>

                                    )
                                })}

                                <button
                                    type=""
                                    className="btn btn-info form-group"
                                    onClick={this.handleShowAddField}>
                                    <b>Add Field</b>
                                </button>

                                <button
                                    type=""
                                    className="btn btn-success form-group"
                                    onClick={this.submitTemplate}
                                    style={{ width: "100%" }}>
                                    <b>Submit</b>
                                </button>
                            </ul>


                        </div>


                        <div className='ft-modal' >
                            <Modal show={this.state.showFieldEdit} onHide={this.handleCloseAddField}>
                                <Modal.Header closeButton>
                                    <Modal.Title className='text-center'>
                                        <b>Field Details</b>
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body >

                                    <div className='' style={{ backgroundColor: "#0000 ", padding: "0.5rem" }}>

                                        <React.Fragment>
                                            <form>
                                                <div className="form-control" >


                                                    <label ><span><h6>Field Name</h6></span></label>
                                                    <input type="text"
                                                        className="form-control form-item"
                                                        style={{ padding: "1rem" }}
                                                        id="FieldName"
                                                        placeholder="Field Name"
                                                        name="FieldName" onChange={this.handleChange}
                                                        value={this.state.field.FieldName} />

                                                    <label ><span><h6>Field Value</h6></span></label>
                                                    <input type="text"
                                                        className="form-control form-item"
                                                        style={{ padding: "1rem" }}
                                                        id="FieldValue"
                                                        placeholder="Field Value"
                                                        name="FieldValue" onChange={this.handleChange}
                                                        value={this.state.field.FieldValue} />

                                                    <div className="">
                                                        <div className="select-wrap">
                                                            <label ><span><h6>Choose Field Type</h6></span></label>
                                                            <select name="FieldType" id="" className="form-control" onClick={this.handleChange} placeholder="Select Type">
                                                                {Type.map((type, key) => {
                                                                    return (
                                                                        <option value={type}>{type}</option>
                                                                    )

                                                                })}
                                                            </select>
                                                        </div>


                                                    </div>
                                                    <button
                                                        type="button"
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



                    </div>
                </div>
            </div>

        )
    }
}
export default AdminPatientDetailsEdit;