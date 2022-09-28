import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import NavBar from './Components/Navbar';
import "./css/open-iconic-bootstrap.min.css";
import "./css/animate.css";
// import "./css/owl.carousel.min.css";
import "./css/owl.theme.default.min.css";
import "./css/magnific-popup.css";
import "./css/aos.css";
import "./css/ionicons.min.css";
import "./css/bootstrap-datepicker.css";
import "./css/flaticon.css";
import "./css/icomoon.css";
import "./css/style.css";



ReactDOM.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
  document.getElementById('root')
);

// document.addEventListener( 'DOMContentLoaded', function() {
//   var element = document.getElementById( 'wprk-admin-app' );
//   if( typeof element !== 'undefined' && element !== null ) {
//       ReactDOM.render( <NavBar />, document.getElementById( 'wprk-admin-app' ) );
//   }
// } )


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
