import { gapi } from "gapi-script";
import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

const clientId =
    "229521899518-v2nb1anhnuj8n1rkqsi0qrpjojkl3l7r.apps.googleusercontent.com";
const developerKey = "AIzaSyDrVkS-ZRFRmTsJvLQTNpshIfEGyr2XhhI";
var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];
var SCOPES = "https://www.googleapis.com/auth/drive.folder";

function App() {
    const [openPicker, data, authResponse] = useDrivePicker();
    // const customViewsArray = [new goog.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
            clientId: clientId,
            developerKey: developerKey,
            viewId: "FOLDERS",
            setSelectFolderEnabled:true,
            //token:"##youraccesstoken##", // pass oauth token in case you already have one
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            setParentFolder:"Lucky",
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
            <button onClick={() => handleOpenPicker()}>Open Picker</button>
        </div>
    );
}

export default App;