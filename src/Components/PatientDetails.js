import React, { Component } from 'react';
import { PatientData } from './PatientData';
import { Patient } from './models/Patient';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';

export default class PatientDetails extends Component {

    
    constructor(props) {
        super(props);
        this.state = {

            pageValue : {
                patData : []
            },
            
            PatName:"",


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
    

    componentDidMount(){
        this.getDetails();
    }

    getDetails=()=>{
        var url = "http://localhost:8080/patientAPI/patientData/" + this.props.match.params.patientId;

        axios.get(url)
        .then(response => this.setState({ patData : response.data, errorMessage: "", successMessage: "success" }))
        .catch(error => { if (error.response) this.setState({ errorMessage: "No doctor exist" }) })


        console.log(this.state.pageValue.patData);
        console.log(url);
        let PatName = this.state.pageValue.patData.map((item) => {
            
            if (item.fieldName === "Name") {
              
              return item.fieldValue;
            }
          });
        
        this.setState(this.state.PatName=PatName);
    }

    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const id=event.target.id;
        const { pageValue } = this.state;
        // this.setState({ formvalue: { ...formvalue, [name]: value } });
        
        
        let newList = this.state.patData.map((item) => {
            console.log(item.fieldId);
            console.log(id);
            
            if (item.fieldId === id) {
              const updatedItem = {
                ...item,
                fieldValue : value,
              };
              console.log('here')
      
              return updatedItem;
            }
      
            return item;
          });

        //   this.setState({ patData : newList });
      
      this.setState( {pageValue :{...pageValue, patData : newList}} );
      
    }

    render() {
        return (
            <div className="App-header"  >
                <div >
                    <br></br>
                    <div className="card">
                    <label className='text-center card-header' style={{width:"100%"}}><b>{this.state.PatName} Details </b></label>
                        <div className='card body-page'>
                            <div className=''>

                                <ul className='nav-menu-item'>

                                    {this.state.pageValue.patData.map((item, index) => {
                                        return (
                                            <div className='form form-control' key={index}>
                                                <h6>{sessionStorage.getItem("userName")}</h6>
                                            <div key={index} className="form-group form-control-sm row">

                                                <label className='col' style={{padding : '0.5rem'}}>{item.fieldName}</label>
                                                <input id={item.fieldId}  
                                                type={item.fieldType} 
                                                onChange={this.handeChange} 
                                                placeholder={item.fieldName} 
                                                name={item.fieldName} 
                                                value={item.fieldValue} >
                                                </input>


                                            </div>
                                            </div>
                                            
                                        )
                                    })}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
