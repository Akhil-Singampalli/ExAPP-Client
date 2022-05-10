import React, { Component } from 'react';


import axios from 'axios';
import Gallery from 'react-photo-gallery';


import Drive from './Drive'
import { images } from '../utils/ImagesData';
import App from './GDrive';



export default class PatientDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {

            pageValue: {
                patData: []
            },
            data: [],

            hide: true,
            images: [],
            PatName: "",
            successMessage: "",
            errorMessage: "",
            login: false,
            showFieldEdit: false,

            doctorsData: [],
            successMessage: "",
            errorMessage: "",
            login: false
        };
    }

    callback = (docs) => {

        console.log(docs)
        const { data } = this.state;

        let newList = this.state.data.map((item) => {

            if (item.fieldName == "Images") {
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

        const url = "http://localhost:8080/docAPI/dataUpdate/113"
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
        var url = "http://localhost:8080/patientAPI/patientData/" + this.props.match.params.patientId;

        axios.get(url)
            .then(response => this.setState({ data: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })


        console.log(this.state.pageValue.patData);
        console.log(url);
        let PatName = this.state.pageValue.patData.map((item) => {

            if (item.fieldName === "Name") {

                return item.fieldValue;
            }
        });

        this.setState(this.state.PatName = PatName);

        console.log(this.state.PatName)
    }

    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const id = event.target.id;
        const { data } = this.state;
        //  this.setState({ data: { ...formvalue, [name]: value } });


        let newList = this.state.data.map((item) => {

            if (item.fieldId == id) {
                const updatedItem = {
                    ...item,
                    fieldValue: value,
                };
                console.log('here')

                return updatedItem;
            }

            return item;
        });

        this.setState({ data: newList });

        //   this.setState( {data :{...data, data : newList}} );

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

        // return gallery;
        // this.setState({images{...images, images : gallery}}
        return (
            <div >
                {/* <img src={"https://drive.google.com/uc?export=view&id=" + urls.match(/[-\w]{25,}/)} width="200px" height="200px" alt="cannot" /> */}
                <Gallery photos={gallery} />
            </ div>
        )


    }

    render() {
        return (
            <div className="App-header"  >

                <div className='card container-fluid ' style={{ marginTop: "70px", width: "100%" }}>
                    <label className='text-center card-header' style={{ width: "100%" }}><b>{this.state.PatName} Details </b></label>
                    <div className=''>
                        <div className='form-control'>

                            <ul className='col-auto'>
                                {/* <h6>{sessionStorage.getItem("userName")}</h6> */}
                                {this.state.data.map((item, index) => {
                                    return (
                                        <div className='' key={index}>
                                            <div  >
                                                {item.fieldType == "text" || "Number" || "Message" ?

                                                    <div key={index} className="form form-group col-auto" style={{ alignItems: "flex-start" }} >
                                                        <label className='form-item' style={{ padding: '0.5rem' }}><b>{item.fieldName}</b></label>
                                                        <input id={item.fieldId}
                                                            className="form-item"
                                                            type={item.fieldType}
                                                            onChange={this.handeChange}
                                                            placeholder={item.fieldValue}
                                                            name={item.fieldName}
                                                            value={item.fieldValue}

                                                            disabled={this.state.hide}
                                                        >
                                                        </input>

                                                    </div>

                                                    : null}

                                                {item.fieldType == ".jpeg" ?

                                                    <div key={index} className="form form-group row" style={{ position: "left" }} >


                                                        {/* {let urls = item.fieldValue.split(',')} */}
                                                        <label className='form-item' style={{ padding: '0.5rem' }}><b>{item.fieldName}</b></label>
                                                        <ul className='col-auto'>
                                                            {item.fieldValue.split(',').map((urls, index) => {

                                                                return (
                                                                    <li className="nav-item cta">
                                                                        <a href={urls} className="nav-link">{urls}</a>
                                                                    </li>

                                                                )


                                                                // return (
                                                                //     <div key={index}>
                                                                //         <img src={"https://drive.google.com/uc?export=view&id=" + urls.match(/[-\w]{25,}/)} width="200px" height="200px" alt="cannot" />
                                                                //     </ div>
                                                                // )

                                                            })}
                                                        </ul>

                                                        {/* {console.log(this.ImageGallery(item))}
                                                        <Gallery photos={this.state.images} /> */}

                                                    </div>

                                                    : null}
                                            </div>

                                        </div>

                                    )
                                })}
                                {this.state.hide ? null :
                                    <div className="form form-group row"  >

                                        <Drive className="form-item" style={{ borderLeft: "80px" }} parentCallback={this.callback} />
                                        <App></App>
                                    </div>

                                }

                            </ul>

                        </div>
                        <button
                            type=""
                            className="btn btn-success form-group"
                            onClick={this.submitDetails}
                            style={{ width: "100%", justifyContent: "center" }}>
                            <b>Submit</b>
                        </button>

                    </div>
                </div>
            </div>

        )
    }
}
