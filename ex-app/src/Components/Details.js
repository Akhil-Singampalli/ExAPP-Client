import React, { Component } from 'react';
import { PatientData } from './PatientData';


export default class Details extends Component {

    render() {
        return (
            <div className="App-header"  >
                <div >
                    <br></br>
                    <div className='card container-fluid' style={{ marginTop: "70px" }}>
                        <div className=''>
                            <div className={true ? 'card card-body' : 'nav-menu navbar-m'}>

                                <ul className='nav-menu-item'>

                                    {PatientData.map((item, index) => {
                                        return (
                                            <div key={index} className="form-control-sm col">
                                                <label>{item.title}</label>
                                                <input id="contactNumber" className="form-control required" type="text" onChange={this.handeChange} placeholder={item.title} name="contactNumber" >
                                                </input>
                                            </div>
                                            // <li key={index} className={item.cName}>
                                            //     <Link to={item.path} className="">
                                            //         {item.icon}
                                            //         <span><h6>{item.title}</h6></span>
                                            //     </Link>
                                            // </li>
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
