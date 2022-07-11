import React, { Component } from 'react';
import "../css/Contact_page/contact.css"



export default class Details extends Component {

    render() {
        return (
            <div className="App-header"  >



                <div className='card container-fluid' style={{ marginTop: "70px"}}>


                    <section className="contact_us">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <div className="contact_inner">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <div className="contact_form_inner">
                                                    <div className="contact_field">
                                                        <h3>Contatc Us</h3>
                                                        <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                                                        <input type="text" className="form-control form-group" placeholder="Name" />
                                                        <input type="text" className="form-control form-group" placeholder="Email" />
                                                        <textarea className="form-control form-group" placeholder="Message"></textarea>
                                                        <button className="contact_form_submit">Send</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="right_conatct_social_icon d-flex align-items-end">
                                                    <div className="socil_item_inner d-flex">
                                                        <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contact_info_sec">
                                            <h4 style={{ color: "#fff" }}>Contact Info</h4>
                                            <div className="d-flex info_single align-items-center">
                                                <i className="fas fa-headset"></i>
                                                <span style={{ color: "#fff" }}>+91 70956 78678</span>
                                            </div>
                                            <div className="d-flex info_single align-items-center">
                                                <i className="fas fa-envelope-open-text"></i>
                                                <span style={{ color: "#fff" }}>exultclinic@gmail.com</span>
                                            </div>
                                            <div className="d-flex info_single align-items-center">
                                                <i className="fas fa-map-marked-alt"></i>
                                                <span style={{ color: "#fff" }}>Dr Jaya’s Exult Aesthetic Clinic 10-2-B2 Siripuram opp Dutt Island building lane besides Eleven Restaurant</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="map_sec" style={{ width: "100%" }}>
                            <div className="container" >
                                <div className="row">
                                    <div className="col-md-10 offset-md-1">
                                        <div className="map_inner">
                                            <h4><b>Find Us on Google Map</b></h4>
                                            <div className="map_bind" >
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.4412291774997!2d83.3154841148811!3d17.723837387877783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a394341a885adb3%3A0x20c0678c58fa9b72!2sDr%20Jaya&#39;s%20Exult%20Aesthetic%20Clinic!5e0!3m2!1sen!2sin!4v1655569630315!5m2!1sen!2sin" width="100%" height="450" frameborder="0" style={{ border: "0" }} allowfullscreen="" aria-hidden="false" tabindex="0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>





                </div>

            </div>

        )
    }
}
