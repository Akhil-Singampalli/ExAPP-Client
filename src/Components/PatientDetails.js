import React, { Component } from 'react';
import { PatientData } from './PatientData';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default class PatientDetails extends Component {







    handeChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const { formvalue } = this.state;
        this.setState({ formvalue: { ...formvalue, [name]: value } });
        this.validate(event);
    }

    render() {
        return (
            <div className="App-header"  >
                <div >
                    <br></br>
                    <div className="body-page">
                        <div className=''>
                            <div className={true ? 'card card-body' : 'nav-menu navbar-m'}>

                                <ul className='nav-menu-item'>

                                    {PatientData.map((item, index) => {
                                        return (
                                            <div>
                                                <h6>{sessionStorage.getItem("userName")}</h6>
                                            <div key={index} className="form-group form-control-sm">
                                                <h6>{item.fieldName}</h6>
                                                <input id={item.fieldName}  type={item.fieldType} onChange={this.handeChange} placeholder={item.fieldName} name={item.fieldName} value={item.fieldValue} >
                                              
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
