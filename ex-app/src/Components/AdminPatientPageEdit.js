import React, { Component } from 'react';

import axios from 'axios';
import { Modal, ModalDialog } from 'react-bootstrap';

import { Type, Field } from './models/FieldDetails';




export default class AdminPatientPageEdit extends Component {

    
    constructor(props) {
        super(props);
        this.data = []
        this.state = {
            field: {
                FieldType: "",
                FieldName: "",
                FieldValue: ""
            },
            patData: []

        };

    }

    
    componentDidMount() {
        // this.state.patdata=PatientData;


        var urlP = "http://localhost:8080/adminAPI/sampPatTempEdt";

        axios.get("http://localhost:8080/adminAPI/sampPatTempEdt")
            .then(response => this.setState({ patData: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })

        this.data = this.state.patData
        console.log(this.state.patdata)
        console.log(this.data)

        let urlD = "http://localhost:8080/docAPI/details";
        axios.get(urlD)
            .then(response => this.setState({ doctorsData: response.data }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })
    }


    submitTemplate = () => {
        axios.post('http://localhost:8080/adminAPI/patTempEdt', this.state.patdata)
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

    handleDelete = key => {
        const rows = [...this.state.rows];
        this.setState({ rows: rows.filter(item => item.key !== key) });
    };


    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        const { field } = this.state;
        this.setState({ field: { ...field, [name]: value } });

        console.log(this.state.field)
    }

    handleShowAddField = () => {
        this.setState({ showFieldEdit: true })
    }

    handleCloseAddField = () => {
        this.setState({ showFieldEdit: false })
    }
    handleAddField = () => {

        const { patdata } = this.state;
        const newData = {
            fieldId: "1",
            fieldName: "Name",
            fieldType: "9999999999",
            fieldValue: "@gmail.com"
        };

        this.data.push(newData);

        this.setState({
            patData: [newData, ...patdata],
            
        });
    }




    render() {

        return (
            <div className="App-header"  >
                {/* {sessionStorage.getItem("userId") ? null : <Redirect to={"/"} ></Redirect> } */}
                <div >
                    <div className='card container-fluid' style={{ marginTop: "70px" }}>
                        <div className='' style={{ width: "100%" }}>
                            <label className='card-header text-center' style={{ width: "100%" }}><b>Patients Details Page</b></label>
                        </div>

                        <div >

                            <ul className='card-body '>


                            {this.state.patData.map((item, index) => {
                                        return (
                                            <div className='' key={index}>
                                               
                                            <div key={index} className="form-control-sm row" style={{position:"left"}} >

                                                <label className='col' style={{padding : '0.5rem'}}>{item.fieldName}</label>
                                                <input id={item.fieldId}  
                                                type={item.fieldType} 
                                                onChange={this.handeChange} 
                                                placeholder={item.fieldName} 
                                                name={item.fieldName} 
                                                value={item.fieldValue}
                                                
                                                disabled = {sessionStorage.getItem("userId") < 10 ? false : true }
                                                >
                                                </input>
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


                    </div>
                </div>
            </div>
        )
    }
}
