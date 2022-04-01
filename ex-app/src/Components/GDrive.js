// import React, { Component, useEffect } from "react";
// import { gapi } from 'gapi-script'
// import DriveLogin from "./DriveLogin"
// import DriveLogOut from "./DriveLogout";
// import * as AiIcons from "react-icons/ai";
// import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd";
// import axios from "axios";
// import useDrivePicker from "react-google-drive-picker";
// import GooglePicker from "react-google-picker";
// import Modal from "react-responsive-modal";


// export default function GDrive() {
//     const [openPicker, data, authResponse] = useDrivePicker();
//    function handleOpenPicker  ()  {
//     openPicker({
//       clientId:"229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com",
//       developerKey:"AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI",
//       viewId:"DOCS",
//       token: gapi.auth.getToken().access_token, // pass oauth token in case you already have one
//       showUploadView: true,
//       showUploadFolders: true,
//       supportDrives: true,
//       multiselect: true,
//       // customViews: customViewsArray, // custom view
//     });
//   };
//     const API_KEY = "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI";
//     const CLIENT_KEY =
//       "229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com";
//     const scope = [
//       "https://www.googleapis.com/auth/drive.readonly",
//       "https://www.googleapis.com/auth/drive.photos.readonly"
//     ];
//     return (
//       <div className="App">
//         <h1>Hello CodeSandbox</h1>
//         <h2>Start editing to see some magic happen!</h2>
//         <Modal open={true} onClose={() => {}} showCloseIcon center>
//           <GooglePicker
//             clientId={CLIENT_KEY}
//             developerKey="AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI"
//             scope={scope}
            
//             navHidden
//             mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
//             createPicker={(google, oauthToken) => {
//               const picker = new window.google.picker.PickerBuilder()
//                 .addView(window.google.picker.ViewId.DOCS_IMAGES)
//                 .addView(window.google.picker.ViewId.IMAGE_SEARCH)
//                 .setOAuthToken(oauthToken)
//                 .setDeveloperKey(API_KEY)
//                 .setCallback(handleOpenPicker)
//                 .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED);
  
//               picker.build().setVisible(true);
//             }}
//           >
//             <a>Drive butn</a>
//           </GooglePicker>
//           <button className="btn" onClick={() => handleOpenPicker()}>Upload</button>
//         </Modal>
//       </div>
//     );
//   }

  


// export default function G() {
//     const [openPicker, data, authResponse] = useDrivePicker();
//     const handleOpenPicker = () => {
//         openPicker({
//           clientId:"229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com",
//           developerKey:"AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI",
//           viewId:"DOCS",
//           token: gapi.auth.getToken().access_token, // pass oauth token in case you already have one
//           showUploadView: true,
//           showUploadFolders: true,
//           supportDrives: true,
//           multiselect: true,
//           // customViews: customViewsArray, // custom view
//         });
//       };
    
//     useEffect(() => {

//         if (data) {
//             data.docs.map((i) => console.log(i));
//           }
//     },[data]);

// return (
//     <div className="row"> 
//         <AiIcons.AiOutlineUpload />        
//        <button className="btn" onClick={() => handleOpenPicker()}>Upload</button>
//        <DriveLogin /> <DriveLogOut />




//        <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
     
//         <GooglePicker
//           clientId={CLIENT_KEY}
//           developerKey={API_KEY}
//           scope={scope}
//           onAuthFailed={this.onAuthFail}
//           navHidden
//           mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
//           createPicker={(google, oauthToken) => {
//             const picker = new window.google.picker.PickerBuilder()
//               .addView(window.google.picker.ViewId.DOCS_IMAGES)
//               .addView(window.google.picker.ViewId.IMAGE_SEARCH)
//               .setOAuthToken(oauthToken)
//               .setDeveloperKey(API_KEY)
//               .setCallback(this.pickerCallback)
//               .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED);

//             picker.build().setVisible(true);
//           }}
//         >
//           <a>Drive butn</a>
//         </GooglePicker>
//     </div>
//     </div>
    

// )
// };

