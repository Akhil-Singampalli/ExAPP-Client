import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

export const MenuData = [
    {
        title: 'Consultations',
        path: '/',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text",
    },
    {
        title: 'Procedures',
        path: '/',
        icon:<FaIcons.FaHandHoldingMedical/>,
        cName: "nav-text",
    },
    {
        title: 'Surgey',
        path: '/',
        icon:<FaIcons.FaProcedures/>,
        cName: "nav-text",
    },
    {
        title: 'Gallery',
        path: '/',
        icon:<MdIcons.MdOutlinePhotoSizeSelectActual/>,
        cName: "nav-text",
    },
]