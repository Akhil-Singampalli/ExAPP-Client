import { useEffect, useRef, useState } from "react";

import useDrivePicker from "react-google-drive-picker";
import axios from "axios";
import * as FcIcons from "react-icons/fc";
import { Button, Collapse } from 'react-bootstrap'

const clientId =
  "229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com";
const developerKey = "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI";
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];
var SCOPES = "https://www.googleapis.com/auth/drive.file";



export default function Drive({ parentFolder,parentCallback }) {
  const [openPicker, data, authRes] = useDrivePicker();
  // const [loaded, error] = useInjectScript();
  const [url, setUrl] = useState("");
  const authButtonRef = useRef();
  const signoutButtonRef = useRef();
  const listFilesButtonRef = useRef();
  const openLinkButtonRef = useRef();

  const initClient = () => {
    console.log("init client");
    window.gapi.client
      .init({
        apiKey: developerKey,
        clientId: clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
      .then(
        () => {
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
          // authButtonRef.current.onclick = handleAuthClick;
          signoutButtonRef.current.onclick = handleSignoutClick;
          listFilesButtonRef.current.onclick = listFileClick;
          console.log("client inited");
        },
        (err) => {
          console.log("client error", err);
        }
      );
  };

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authButtonRef.current.style.display = "none";
      signoutButtonRef.current.style.display = "block";
      listFilesButtonRef.current.style.display = "block";
      // listFiles();
    } else {
      authButtonRef.current.style.display = "block";
      signoutButtonRef.current.style.display = "none";
      listFilesButtonRef.current.style.display = "none";
    }
  }

  useEffect(() => {
    if (authRes) {
      if (window.gapi) {
        console.log(window.gapi);
        window.gapi.load("client", initClient);
      }
    }
  }, [authRes]);
  // console.log("api picker", window.gapi.client);
  const open = () => {
    console.log(parentFolder)
    openPicker({
      clientId,
      developerKey,
      viewId: "FOLDERS",
      MimeTypes: "video/mp4 ,image/jpeg",
      supportDrives: true,
      multiselect: true,
      customScopes: ["https://www.googleapis.com/auth/drive.file"],
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      setParentFolder:parentFolder
    });
  };

  const upload = async (docs) => {
    //Do we only upload one file even if the user selected more than 1 file?
    //Should we keep allowing the user to select more than 1 file?
    const doc = docs[0];
    //get the name and the link from the file.
    const { name, url, id } = doc;
    console.log({ name, url, id });

    window.gapi.client.drive.files
      .get({ fileId: id, fields: "*" })
      .then((res) => {
        console.log(JSON.parse(res.body));
        const url = JSON.parse(res.body).webViewLink;
        setUrl(url);
        openUrl(url);
        console.log("is ress", JSON.parse(res.body));
      })
      .catch((err) => {
        console.log("is error", err);
      });
  };

  useEffect(() => {
    if (data) {
       const urls = data.docs.map((doc) => doc.url)
       console.log(data.docs);
      upload(urls);
      parentCallback(data.docs);
    }
  }, [data]);
  const handleAuthClick = (event) => {
    window.gapi.auth2.getAuthInstance().signIn();
  };
  const handleSignoutClick = (event) => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const openUrl = (url) => {
    console.log(url, authRes.access_token);
    // window.open(url);
    const headers = {
      Authorization: "Bearer " + authRes.access_token,
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8"
    };
    console.log(headers);
    fetch(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({ err });
      });
    // axios
    //   .post(url, null, { headers })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };

  //when button is clicked open the url gotten for the file.
  function listFiles() {
    window.gapi.client.drive.files.list().then(
      function (response) {
        console.log("getting files");
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.kind === "drive#file") {
              window.gapi.client.drive.files
                .get({ fileId: file.id, fields: "*" })
                .then((res) => {
                  console.log(JSON.parse(res.body));
                  const url = JSON.parse(res.body).webContentLink;
                  setUrl(url);
                  openUrl(url);
                  // console.log("is ress", JSON.parse(res.body));
                })
                .catch((err) => {
                  console.log("is error", err);
                });
            }
          }
        } else {
          console.log("no files found");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const listFileClick = (event) => {
    listFiles();
  };
  // const handleOpenLink = (event) => {
  //   console.log(url, " to open");
  //   window.open(url);
  // };

  

  return (
    <div className="">
      

      <Button className="btn"  onClick={open} style={{ width:'120px',height: '30px',paddingBlock:'3px'}}><FcIcons.FcGoogle size={"20px"}/><b> UPLOAD</b></Button>
      
      {/* <button className="btn col-auto" onClick={handleSignoutClick}><FcIcons.FcGoogle/>    <b>Sign out</b></button> */}
      
      {/* <button onClick={listFileClick}>list files</button>
      <br /> */}
      {/* <button onClick={handleOpenLink} ref={openLinkButtonRef}>
        open link
      </button> */}

      
      
    </div>
  );
}
