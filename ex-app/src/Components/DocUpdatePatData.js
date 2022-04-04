import axios from 'axios';
import React, { Component } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { FaArrowAltCircleDown, FaArrowDown, FaCartArrowDown, FaDocker, FaSearch, FaSortDown } from 'react-icons/fa';
// import { right } from '@popperjs/core';

import { Redirect, Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';



class DocUpdatePatData extends Component {

    constructor(props) {
        super(props);
        this.state = {

            patData: [],
            entry:"",
            patDataCopy: [],

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

    componentDidMount () {
        this.getDetails();
        console.log("here");
    }

    getDetails = () => {
        axios.get('http://localhost:8080/docAPI/patdata/1')
            .then(response => this.setState({ patData: response.data, patDataCopy: response.data, errorMessage: "", successMessage: "success" }))
            .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })
        console.log(this.state.doctorsData)
    }



    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const { formvalue } = this.state;
        this.setState({ formvalue: { ...formvalue, [name]: value } });
        this.validate(event);
    }

    handleSearch = (event) => {
        const word = event.target.value;
        console.log(word)
        if(word != ''){
            const filtered = this.state.patDataCopy.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(word.toLocaleLowerCase())));

        console.log(filtered)
        this.setState({patData : filtered})
        }else{
            this.setState({patData : this.state.patDataCopy})
        }
        
        
    }


    render() {

        return (

            <div className='App-header' >

                
                    <div className='card container-fluid' style={{ marginTop: "75px", width : "100%" }}>
                        <label className='text-center card-header' style={{width:"100%"}}><b>Patients Details</b></label>
                        <div className='right form-control col-auto' style={{}}>
                            

                            <input className='search' style={{ padding: '0.5px' ,float : "right"}} placeholder='   Search   ' name="search" onChange={this.handleSearch}></input>
                            <FaSearch className=''style={{ padding: '1px' ,float : "right",marginTop:"5px",marginRight:"5px"}}></FaSearch>
                        </div>

                        <Table className='table form-control ' style={{width:"100%"}}>
                            <Tr>
                                <Th className='thead th column-collapse'>.</Th>
                                <Th className='thead th  col-3'>Patient Name</Th>
                                <Th className='thead th col-3'>Contact Number</Th>
                                <Th className='thead th col-4'>Email id</Th>
                                <Th className='thead th col-2'>Details</Th>
                                <Th className='thead th col-2'>Appointment</Th>
                            </Tr>
                            {this.state.patData.map((val, key) => {
                                return (
                                    <Tbody>
                                        <Tr key={key}>
                                            <Td>
                                                <button className="btn br-button btn-info" type="button" data-toggle="collapse" data-target="collapse-1-4-4527"><FaSortDown></FaSortDown>
                                                </button>
                                            </Td>


                                            <Td className='tdata td col-xl-auto'>{val.patientName}</Td>
                                            <Td className='tdata  td'>{val.contactNumber}</Td>
                                            <Td className='tdata  td'>{val.emailId}</Td>
                                            <Td  className='tdata  td'>
                                                <ButtonToolbar className='tdata  td'>
                                                    <Link to={"/details/" + val.idPatient} >
                                                        <button type="submit" className='btn btn-primary tdata td'>Details ... </button>
                                                        
                                                    </Link>
                                                </ButtonToolbar>

                                            </Td>
                                            <Td  className='tdata  td'>
                                                <ButtonToolbar className='tdata  td'>
                                                    <Link to={"/appointment/" + val.idPatient} >
                                                       
                                                        <button type="success" className='btn btn-warning tdata td' >Book Appointment </button>
                                                    </Link>
                                                </ButtonToolbar>

                                            </Td>

                                        </Tr>
                                        <Tr className="collapse br-table column-checkbox">
                                            <Td id="collapse-1-4-4527" aria-hidden="true" hidden="hidden" colspan="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</Td>
                                        </Tr>

                                    </Tbody>


                                )
                            })}
                            <tr>

                            </tr>
                        </Table>
                    </div>
                
            </div>

        )
    }
}

export default DocUpdatePatData;
