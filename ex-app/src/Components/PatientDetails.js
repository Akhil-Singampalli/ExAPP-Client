import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import Collapse from "react-bootstrap/Collapse";
import { FaSortDown } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { DiGoogleDrive } from 'react-icons/di';
import Drive from './Drive';
import * as FcIcons from "react-icons/fc"
import { images } from '../utils/ImagesData';
import Upload from './GDrive';
import GoogleDocsViewer from 'react-google-docs-viewer';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { DocumentViewer } from 'react-documents';
import {patDataUpdate_URL,patPatientId_URL,patPatData_URL,patFolders_URL} from "../utils/URL";
const docs = [
    { uri: "https://docs.google.com/document/d/1cCUPT72X_GmpU40kxxuQ79B-4rxgnSPWXtnpu00q1Ns/edit?usp=sharing" }
    // Local File
];
// import { Upload } from 'antd';



export default class PatientDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {

            pageValue: {
                patData: []
            },
            pat: "",
            data: [],

            hide: true,
            images: [],
            PatName: "",
            patData: "",
            successMessage: "",
            errorMessage: "",
            login: false,
            showFieldEdit: false,

            togglePrescription: false,
            toggleImages: false,
            toggleBills: false,

            doctorsData: [],
            successMessage: "",
            errorMessage: "",
            login: false
        };
    }

    callbackImages = (docs) => {

        console.log(docs)
        const { data } = this.state;

        let newList = this.state.data.map((item) => {

            if (item.fieldName == "IMAGES") {
                const updatedItem = {
                    ...item,
                    fieldValue: docs.map((doc) => item.fieldValue.concat(',', doc.url)).toString()
                };
                console.log('here')

                return updatedItem;
            }

            return item;
        });

        this.setState({ data: newList });

        console.log(this.state.data)

    }

    callbackPrescriptions = (docs) => {

        console.log(docs)
        const { data } = this.state;

        let newList = this.state.data.map((item) => {

            if (item.fieldName == "PRESCRIPTIONS") {
                const updatedItem = {
                    ...item,
                    fieldValue: docs.map((doc) => item.fieldValue.concat(',', doc.url)).toString()
                };
                console.log('here')

                return updatedItem;
            }

            return item;
        });

        this.setState({ data: newList });

        console.log(this.state.data)

    }

    callbackBills = (docs) => {

        console.log(docs)
        const { data } = this.state;

        let newList = this.state.data.map((item) => {

            if (item.fieldName == "BILLS") {
                const updatedItem = {
                    ...item,
                    fieldValue: docs.map((doc) => item.fieldValue.concat(',', doc.url)).toString()
                };
                console.log('here')

                return updatedItem;
            }

            return item;
        });

        this.setState({ data: newList });

        console.log(this.state.data)

    }


    componentDidMount() {
        this.getDetails();
        { (sessionStorage.getItem("userId") <= 10) ? this.writePermission() : this.readPermission() }


    }

    writePermission = () => {
        this.setState({ hide: false })
    }

    readPermission = () => {
        this.setState({ hide: true })
    }

    submitDetails = () => {
        const { data } = this.state;

        const url = patDataUpdate_URL + this.props.match.params.patientId;
        axios.put(url, data)
            .then(response => this.setState({
                successMessage: "Submit Successfull !!",
                errorMessage: ""
            })).catch(error => {
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                } else {
                    this.setState({ errorMessage: "Server is down", successMessage: "" });
                }
            });

    }


    getDetails = () => {
        var url = patPatientId_URL + this.props.match.params.patientId;

        axios.get(url)
            .then(response => this.setState({ pat: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "Invalid Patient ID" }) })

        var url = patPatData_URL + this.props.match.params.patientId;

        axios.get(url)
            .then(response => this.setState({ data: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "Invalid Patient ID" }) })

        var url = patFolders_URL + this.props.match.params.patientId;

        axios.get(url)
            .then(response => this.setState({ patData: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "Invalid Patient ID" }) })
        console.log(this.state.patData)


    }


    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const id = event.target.id;
        const { data } = this.state;
        //  this.setState({ data: { ...formvalue, [name]: value } });


        let newList = this.state.data.map((item, index) => {

            if (item.fieldId == id) {
                const updatedItem = {
                    ...item,
                    fieldValue: value,
                };
                // console.log('here')

                return updatedItem;
            }

            return item;
        });

        this.setState({ data: newList });


    }

    togglePrescriptions = () => {
        this.setState({ togglePrescription: !this.state.togglePrescription })
    }

    toggleImages = () => {
        this.setState({ toggleImages: !this.state.toggleImages })
    }

    toggleBills = () => {
        this.setState({ toggleBills: !this.state.toggleBills })
    }


    ImageGallery = (item) => {
        let gallery = []

        item.fieldValue.split(',').map((urls, index) => {

            gallery.push(
                {
                    src: "https://drive.google.com/uc?export=view&id=" + urls.match(/[-\w]{25,}/),
                    width: 10,
                    height: 7
                }
            )
            console.log(gallery);

        })

        // // return gallery;
        // // this.setState({images{...images, images : gallery}}
        // return (
        //     <div >
        //         {/* <img src={"https://drive.google.com/uc?export=view&id=" + urls.match(/[-\w]{25,}/)} width="200px" height="200px" alt="cannot" /> */}
        //         <Gallery photos={gallery} />
        //     </ div>
        // )


    }

    render() {
        return (
            <div className="App-header"  >

                <div className='container-fluid' style={{ marginTop: "70px", width: "100%", backgroundColor: "rgba(255, 255, 255,0.8)" }}>
                    <label className='text-center card-header' style={{ width: "100%" }}><b>{this.state.pat.patientName} Details </b></label>
                    <div className='card' style={{ width: "100%", marginTop: "5px", textAlign: "left", alignItems: "baseline", Color: "rgba(255, 255, 255,1)" }}>
                        <div className='form-control'>
                            <h6 ><span style={{ fontWeight: 400, marginLeft: "5px" }}><b>Personal Information : </b></span></h6>
                            <div class="u-expanded-width u-form u-form-1">
                                <form action="#" method="POST" class="u-clearfix u-form-spacing-17 u-form-vertical u-inner-form" source="email" name="form" style={{ padding: "0px" }}>
                                    <div class="u-form-group u-form-name u-label-left">
                                        <label for="name-4c18" class="u-label">e-xult ID :</label>
                                        <label type="text" placeholder="Enter your Name" id="name-4c18" name="name" required="">{this.state.pat.patientId}</label>
                                    </div>
                                    <div class="u-form-group u-form-name u-label-left">
                                        <label for="name-4c18" class="u-label">Name  :</label>
                                        <label type="text" placeholder="Enter your Name" id="name-4c18" name="name" required="">{this.state.pat.patientName}</label>
                                    </div>
                                    <div class="u-form-email u-form-group u-label-left">
                                        <label for="email-4c18" class="u-label">Email  :</label>
                                        <label type="email" placeholder="Enter a valid email address" id="email-4c18" name="email"  >{this.state.pat.emailId}</label>
                                    </div>
                                    <div class="u-form-group u-label-left u-form-group-3">
                                        <label for="text-717e" class="u-label">Age :</label>
                                        <label type="text" placeholder="" id="text-717e" name="age" ></label>
                                    </div>
                                    <div class="u-form-group u-label-left u-form-group-4">
                                        <label for="text-f906" class="u-label">Sex :</label>
                                        <label type="text" placeholder="" id="text-f906" name="sex" ></label>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='card' style={{ width: "100%", marginTop: "5px", textAlign: "left", alignItems: "baseline", Color: "rgba(255, 255, 255,1)" }}>
                        <div className='form-control' style={{ width: "100%" }}>
                            <h6 ><span style={{ fontWeight: 400, marginLeft: "5px" }}><b>Case Details : </b></span></h6>
                            <div style={{ width: "50%", marginLeft: "5px", textAlign: "left" }}>
                                <form  >
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <div className='' key={index}>

                                                <div>
                                                    {item.fieldType == "text" || "Number" || "Message" ?

                                                        <div key={index} className="col-auto" style={{ alignItems: "flex-start" }} >
                                                            <label className='' style={{ padding: '0.5rem' }}><b>{item.fieldName}</b></label>
                                                            <input id={item.fieldId}
                                                                className=""
                                                                type={item.fieldType}
                                                                onChange={this.handeChange}
                                                                placeholder={item.fieldValue}
                                                                name={item.fieldName}
                                                                value={item.fieldValue}

                                                                disabled={this.state.hide}
                                                                style={{ padding: "5px 20px" }}
                                                            >
                                                            </input>
                                                        </div>

                                                        : null}


                                                </div>
                                            </div>
                                        )

                                    })}

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='card container-fluid' style={{ width: "100%", height: "800px", marginTop: "3px" }}>

                        <h4 ><span style={{ fontWeight: 400, marginLeft: "0px" }}><b>Case Sheet  </b></span></h4>
                        <DocumentViewer
                            url={this.state.patData.pres_data_id}
                            viewer="url"
                            style={{ width: "70%", height: "800px", borderRadius: "10px" }}
                        >
                        </DocumentViewer>
                    </div>
                    <br></br>

                    <div className='container-fluid card' style={{ width: "100%", marginTop: '3px', minHeight: "40px", backgroundColor: '#000', textAlign: "left" }}>
                        
                                <Button className="row" type="button" name="prescription" onClick={this.togglePrescriptions} style={{ width: '100%', height: '40px', padding: '3px' ,backgroundColor:'black'}}>
                                    <div className='row'>
                                    <h6 className='col'><span style={{ fontWeight: 400, color: "white" }}><b>Prescriptions</b> </span></h6>
                                    <IoIosArrowDropdownCircle className='col-auto' size={"30px"}></IoIosArrowDropdownCircle>
                                        </div>
                                    
                                    </Button>
                           
                        <Collapse in={this.state.togglePrescription}>


                            <div className='container-fluid' style={{ backgroundColor: 'white', width: '100%', borderRadius: "5px" }}>
                                <Drive className="col" parentFolder={this.state.patData.pres_data_id} parentCallback={this.callbackPrescriptions} style={{ float: 'right' }} />
                                {this.state.data.map((item, index) => {
                                        return (
                                            <div className='' key={index}>
                                                
                                                    {item.fieldName == "PRESCRIPTIONS" ?

                                                            <ul className='' style={{alignItems:'flex-start',float:'left'}}>
                                                                {item.fieldValue.split(',').map((urls, index) => {
                                                                    return (
                                                                        <li className="">
                                                                            <a href={urls} className=""><h6>{urls}</h6></a>
                                                                        </li>

                                                                    )

                                                                })}
                                                            </ul>
                                                        : null}
                                                
                                            </div>
                                        )
                                    })}
                            </div>

                        </Collapse>

                    </div>

                    

                    <div className='container-fluid card' style={{ width: "100%", marginTop: '3px', minHeight: "40px", backgroundColor: '#000', textAlign: "left" }}>

                    <Button className="row" type="button" name="prescription" onClick={this.toggleImages} style={{ width: '100%', height: '40px', padding: '3px' ,backgroundColor:'black'}}>
                                    <div className='row'>
                                    <h6 className='col'><span style={{ fontWeight: 400, color: "white" }}><b>Images</b> </span></h6>
                                    <IoIosArrowDropdownCircle className='col-auto' size={"30px"}></IoIosArrowDropdownCircle>
                                        </div>
                                    
                                    </Button> 
                        
                          
                            
                            <Collapse in={this.state.toggleImages}>
                                <div className='container-fluid' style={{ backgroundColor: 'white', width: '100%', borderRadius: "5px" }}>
                                <Drive className="" parentFolder={this.state.patData.img_data_id} parentCallback={this.callbackImages} />
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <div className='' key={index}>
                                                
                                                    {item.fieldType == "IMAGES" ?

                                                            <ul className='' style={{alignItems:'flex-start',float:'left'}}>
                                                                {item.fieldValue.split(',').map((urls, index) => {
                                                                    return (
                                                                        <li className="">
                                                                            <a href={urls} className=""><h6>{urls}</h6></a>
                                                                        </li>

                                                                    )

                                                                })}
                                                            </ul>
                                                        : null}
                                                
                                            </div>
                                        )
                                    })}
                                </div>
                            </Collapse>
                        

                    </div>

                    <div className='container-fluid card' style={{ width: "100%", marginTop: '3px', minHeight: "40px", backgroundColor: '#000', textAlign: "left" }}>
                        
                                <Button className="row" type="button" name="prescription" onClick={this.toggleBills} style={{ width: '100%', height: '40px', padding: '3px' ,backgroundColor:'black'}}>
                                    <div className='row'>
                                    <h6 className='col'><span style={{ fontWeight: 400, color: "white" }}><b>Bills</b> </span></h6>
                                    <IoIosArrowDropdownCircle className='col-auto' size={"30px"}></IoIosArrowDropdownCircle>
                                        </div>
                                    
                                    </Button>
                           
                        <Collapse in={this.state.toggleBills}>


                            <div className='container-fluid' style={{ backgroundColor: 'white', width: '100%', borderRadius: "5px" }}>
                                <Drive className="col" parentFolder={this.state.patData.bills_data_id} parentCallback={this.callbackBills} style={{ float: 'right' }} />
                                {this.state.data.map((item, index) => {
                                        return (
                                            <div className='' key={index}>
                                                
                                                    {item.fieldType == "BILLS" ?

                                                            <ul className='' style={{alignItems:'flex-start',float:'left'}}>
                                                                {item.fieldValue.split(',').map((urls, index) => {
                                                                    return (
                                                                        <li className="">
                                                                            <a href={urls} className="link"><h6>{urls}</h6></a>
                                                                        </li>

                                                                    )

                                                                })}
                                                            </ul>
                                                        : null}
                                                
                                            </div>
                                        )
                                    })}
                            </div>

                        </Collapse>

                    </div>

                   <br></br>


                    <button
                        type=""
                        className="btn btn-success form-group"
                        onClick={this.submitDetails}
                        style={{ width: "100%", justifyContent: "center" }}>
                        <b>Submit</b>
                    </button>

                </div>
            </div>

        )
    }
}
