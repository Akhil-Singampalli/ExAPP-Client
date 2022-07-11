import React, { Component } from 'react';
import "../css/Services_page/services.css"
import hairServiceImage from "../utils/services/hair.jpg"
import faceServiceImage from "../utils/services/face.jpg"
import bodyServiceImage from "../utils/services/body.jpg"
import laserServiceImage from "../utils/services/laser.jpg"
import skinServiceImage from "../utils/services/skin.jpg"
import surgeriesServiceImage from "../utils/services/surgeries.jpg"




export default class Details extends Component {

    render() {
        return (
            <div className="App-header"  >

                <div className="container-fluid services-container" style={{ marginTop: "70px", width: "100%" }}    >

                    <div className='' id="services-top-row">

                        <div className="services-glass-card">

                            <div class="service-card-info">

                                <i class="bi bi-key-fill"></i>

                                <h3>
                                    <b>Hair</b>
                                </h3>
                                <img src={hairServiceImage} alt="img09" class="img-fluid" />
                                <figure class="effect-ming">
                                    <p>
                                        <ul>
                                            <li>Hair Transplantation</li>
                                            <li>FUT</li>
                                            <li>Hair Loss Management</li>
                                            <li>Hair Vitamins</li>
                                            <li>Hair Mesotherapy & PRP</li>
                                            <li>Scalp Micro Pigme</li>
                                        </ul>
                                    </p>
                                    <figcaption>
                                        {/* <p>VIEW PAGE</p>
                                                <a href="/security/access-control" rel="noopener">View more</a> */}
                                    </figcaption>
                                </figure>



                            </div>


                        </div>

                        <div className="services-glass-card">

                            <div class="service-card-info">

                                <i class="bi bi-key-fill"></i>

                                <h3>
                                    <b>Face</b>
                                </h3>
                                <img src={faceServiceImage} alt="img09" class="img-fluid" />

                                <figure class="effect-ming">

                                    <p>
                                        <ul>
                                            <li>Face lift</li>
                                            <li>Dark Circles Management</li>
                                            <li>Nose Reshaping</li>
                                            <li>Dimple Creation</li>
                                            <li>Lip Fillers</li>
                                            <li>Neck Lift, Folds Correction</li>
                                        </ul>
                                    </p>
                                    <figcaption>
                                        {/* <p>VIEW PAGE</p>
                                                <a href="/security/access-control" rel="noopener">View more</a> */}
                                    </figcaption>
                                </figure>

                            </div>

                        </div>

                        <div className="services-glass-card">

                            <div class="service-card-info">

                                <i class="bi bi-key-fill"></i>

                                <h3>
                                    <b>Skin Rejuvenation</b>
                                </h3>
                                <img src={skinServiceImage} alt="img09" class="img-fluid" />

                                <figure class="effect-ming">

                                    <p>
                                        <ul>
                                            <li>Chemical peels</li>
                                            <li>Medi facials</li>
                                            <li>Face lift</li>
                                            <li>Laser facials</li>
                                            <li>Acne and Acne Scars</li>
                                            <li>Pigmentation Management</li>
                                        </ul>
                                    </p>
                                    <figcaption>
                                        {/* <p>VIEW PAGE</p>
                                                <a href="/security/access-control" rel="noopener">View more</a> */}

                                    </figcaption>

                                </figure>

                            </div>

                        </div>



                    </div>

                    <div id="services-bottom-row">
                        <div className="services-glass-card">

                            <div class="service-card-info">

                                <i class="bi bi-key-fill"></i>

                                <h3>
                                    <b>Hair</b>
                                </h3>

                                <figure class="effect-ming">
                                    <img src={hairServiceImage} alt="img09" class="img-fluid" />
                                    <figcaption>
                                        {/* <p>VIEW PAGE</p>
                <a href="/security/access-control" rel="noopener">View more</a> */}
                                    </figcaption>
                                </figure>

                                <p>
                                    <ul>
                                        <li>Hair Transplantation</li>
                                        <li>FUT</li>
                                        <li>Hair Loss Management</li>
                                        <li>Hair Vitamins</li>
                                        <li>Hair Mesotherapy & PRP</li>
                                        <li>Scalp Micro Pigme</li>
                                    </ul>
                                </p>

                            </div>

                            {/* <div class="service-card-video">

    <div class="tool-tip-container">

        <p class="d-none d-lg-block">
            CLICK PREVIEW BELOW TO VIEW PAGE.
        </p>

        <p class="d-block d-lg-none">
            TAP PREVIEW BELOW TO VIEW PAGE.
        </p>

    </div>

   
</div> */}

                        </div>

                        <div className="services-glass-card">

                            {/* <div class="camera-container">
    <div class="circle">
        <div class="camera-eye">
            <div class="inner-eye">
                <div class="blinking"></div>
            </div>
        </div>
    </div>
</div> */}

                            <div class="service-card-info">

                                <i class="bi bi-key-fill"></i>

                                <h3>
                                    <b>Hair</b>
                                </h3>

                                <figure class="effect-ming">
                                    <img src={hairServiceImage} alt="img09" class="img-fluid" />
                                    <figcaption>
                                        {/* <p>VIEW PAGE</p>
                <a href="/security/access-control" rel="noopener">View more</a> */}
                                    </figcaption>
                                </figure>

                                <p>
                                    <ul>
                                        <li>Hair Transplantation</li>
                                        <li>FUT</li>
                                        <li>Hair Loss Management</li>
                                        <li>Hair Vitamins</li>
                                        <li>Hair Mesotherapy & PRP</li>
                                        <li>Scalp Micro Pigme</li>
                                    </ul>
                                </p>

                            </div>

                            {/* <div class="service-card-video">

    <div class="tool-tip-container">

        <p class="d-none d-lg-block">
            CLICK PREVIEW BELOW TO VIEW PAGE.
        </p>

        <p class="d-block d-lg-none">
            TAP PREVIEW BELOW TO VIEW PAGE.
        </p>

    </div>

   
</div> */}

                        </div>

                        <div className="services-glass-card">

                            {/* <div class="camera-container">
    <div class="circle">
        <div class="camera-eye">
            <div class="inner-eye">
                <div class="blinking"></div>
            </div>
        </div>
    </div>
</div> */}

                            <div class="service-card-info">

                                <i class="bi bi-key-fill"></i>

                                <h3>
                                    <b>Hair</b>
                                </h3>

                                <figure class="effect-ming">
                                    <img src={hairServiceImage} alt="img09" class="img-fluid" />
                                    <figcaption>
                                        {/* <p>VIEW PAGE</p>
                <a href="/security/access-control" rel="noopener">View more</a> */}
                                    </figcaption>
                                </figure>

                                <p>
                                    <ul>
                                        <li>Hair Transplantation</li>
                                        <li>FUT</li>
                                        <li>Hair Loss Management</li>
                                        <li>Hair Vitamins</li>
                                        <li>Hair Mesotherapy & PRP</li>
                                        <li>Scalp Micro Pigme</li>
                                    </ul>
                                </p>

                            </div>

                            {/* <div class="service-card-video">

    <div class="tool-tip-container">

        <p class="d-none d-lg-block">
            CLICK PREVIEW BELOW TO VIEW PAGE.
        </p>

        <p class="d-block d-lg-none">
            TAP PREVIEW BELOW TO VIEW PAGE.
        </p>

    </div>

   
</div> */}

                        </div>



                    </div>

                </div>



            </div>

        )
    }
}
