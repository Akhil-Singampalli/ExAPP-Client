import { gapi } from "gapi-script";
import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";
import * as FcIcons from "react-icons/fc"

const clientId =
    "229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com";
const developerKey = "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI";
var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];
var SCOPES = "https://www.googleapis.com/auth/drive.folder";

function Upload(parentFolder) {
    const [openPicker, data, authResponse] = useDrivePicker();
    // const customViewsArray = [new goog.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
            clientId: clientId,
            developerKey: developerKey,
            viewId: "DOCS",
            setSelectFolderEnabled:false,
            // token:"##youraccesstoken##", // pass oauth token in case you already have one
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            setParentFolder:parentFolder,
            multiselect: true,
            // customViews: ["FOLDERS","DOCS_IMAGES"], // custom view
        });
    };

    useEffect(() => {
        // do anything with the selected/uploaded files
        if (data) {
            data.docs.map((i) => console.log(i));
        }
    }, [data]);

    return (
        <div>
            <button className="btn" onClick={() => handleOpenPicker()} style={{color:"#000"}}><FcIcons.FcGoogle/><b> Upload</b></button>
        </div>
    );
}

export default Upload;