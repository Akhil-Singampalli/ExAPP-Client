import axios from 'axios';
import React, { Component } from 'react';
import ReactTable from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { PatDetails } from './PatientData';



class DocUpdatePatData extends Component {

    constructor(props) {
        super(props);
        this.state = {

            patData: PatDetails,

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

    // componentDidMount() {
    //     this.getDetails();
    //     console.log("here");
    // }

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

            <div>

                <div >

                    <div className='App-header'>
                        {/* <ReactTable
                            data={data}
                            columns={columns}
                            defaultPageSize={2}
                            pageSizeOptions={[2, 4, 6]}
                        /> */}
                        <div className='container body-page' >
                            <Table className='form-control table table-active table-responsive'>
                                <Tr>

                                    <Th className='thead th column-collapse" scope="col'></Th>
                                    <Th className='thead th column-collapse" scope="col'>Patient Name</Th>
                                    <Th className='thead th column-collapse" scope="col'>Contact Number</Th>
                                    <Th className='thead th column-collapse" scope="col'>Email id</Th>
                                    <Th className='thead th column-collapse" scope="col'>Details</Th>
                                </Tr>
                                {this.state.patData.map((val, key) => {
                                    return (
                                        <Tbody>
                                            <Tr key={key}>
                                                <Td>
                                                    <button className="br-button circle small" type="button" data-toggle="collapse" data-target="collapse-1-4-4527"><i aria-hidden="true"></i>
                                                    </button>
                                                </Td>


                                                <Td className='tdata  td'>{val.patientName}</Td>
                                                <Td className='tdata  td'>{val.contactNumber}</Td>
                                                <Td className='tdata  td'>{val.emailId}</Td>
                                                <Td className='tdata table-info table-hover td'>Details</Td>
                                            </Tr>
                                            <Tr className="collapse">
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
            </div>







        )
    }
}

export default DocUpdatePatData;
