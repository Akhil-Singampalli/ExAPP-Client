import axios from 'axios';
import React, { Component } from 'react';
import ReactTable from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { PatDetails } from './PatientData';
import { FaArrowAltCircleDown, FaArrowDown, FaCartArrowDown, FaDocker, FaSearch, FaSortDown } from 'react-icons/fa';
import { right } from '@popperjs/core';
import { MdPadding } from 'react-icons/md';
import { Redirect, Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';



class DocUpdatePatData extends Component {

    constructor(props) {
        super(props);
        this.state = {

            patData: [],

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
            .then(response => this.setState({ patData: response.data, errorMessage: "", successMessage: "success" }))
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


    render() {

        return (

            <div className='App background'>

                <div className='container' >
                    <div className='card' style={{ padding: 5 }}>
                        <label className='text-center card-header' style={{width:"100%"}}><b>Patients Details</b></label>
                        <div className='right form form-row form-control' style={{}}>
                            <FaSearch ></FaSearch>

                            <input className=' search-bar' style={{ padding: '5' ,float : "right"}} placeholder='   Search   '></input>
                        </div>

                        <Table className='table form-control card-body '>
                            <Tr>
                                <Th className='thead th column-collapse'>.</Th>
                                <Th className='thead th  col-3'>Patient Name</Th>
                                <Th className='thead th col-3'>Contact Number</Th>
                                <Th className='thead th col-4'>Email id</Th>
                                <Th className='thead th col-2'>Details</Th>
                            </Tr>
                            {this.state.patData.map((val, key) => {
                                return (
                                    <Tbody>
                                        <Tr key={key}>
                                            <Td>
                                                <button className="br-button circle small button" type="button" data-toggle="collapse" data-target="collapse-1-4-4527"><FaSortDown></FaSortDown>
                                                </button>
                                            </Td>


                                            <Td className='tdata td col-xl-auto'>{val.patientName}</Td>
                                            <Td className='tdata  td'>{val.contactNumber}</Td>
                                            <Td className='tdata  td'>{val.emailId}</Td>
                                            <Td  className='tdata  td'>
                                                <ButtonToolbar className='tdata  td'>
                                                    <Link to={"/details/" + val.idPatient} >
                                                        <button type="submit" className='btn btn-primary tdata td' onClick={() => <Redirect to={"/details/" + val.idPatient} ></Redirect>} >Details ... </button>
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
            </div>

        )
    }
}

export default DocUpdatePatData;
