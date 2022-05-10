import { useEffect, useRef, useState } from "react";
import axios from "axios";



export default function SMS ({ smsData }) {

const data = smsData;

var body = {
    "flow_id": "61701531163abd49a820db42",
    "sender": "exults",
    "mobiles": "919515050278",
    "VAR1": "Akhil",
    "VAR2": "Akki"
  }

axios.post("https://api.msg91.com/api/v5/flow/", body ,{ 
    headers: {
        "Authkey" : "312379AYnyiHzkHSVm6161ac34P1",
        "Content-Type" : "application/JSON",
        "Host" : "api.msg91.com",
        "Content-Length" : 130,
    }
}).then(
    (response) => {
        console.log(response.data)
    }
).catch((error) => {
    console.log(error)
})


}
