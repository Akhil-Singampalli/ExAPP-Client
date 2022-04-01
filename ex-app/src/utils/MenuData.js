import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

export const MenuData = [
    {
        title: 'Details',
        path: '/details/'+ sessionStorage.getItem("userId"),
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text",
    },
    {
        title: 'Appointments',
        path: '/getApt/'+ sessionStorage.getItem("userId"),
        icon:<AiIcons.AiOutlineCalendar/>,
        cName: "nav-text",
    },
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

export const MenuDataAdmin = [
    {
        title: 'Appointments',
        path: '/getApt/'+ sessionStorage.getItem("userId"),
        icon:<AiIcons.AiOutlineCalendar/>,
        cName: "nav-text",
    },

    {
        title: 'Edit Patient Details Page',
        path: '/patientPageEdit',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text ",
    },
    {
        title: 'Add Patient Details',
        path: '/addPatDetails',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text",
    },
    {
        title: 'Upload Patient Bulk',
        path: '/addPats',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text",
    },
    {
        title: 'Add Doctor',
        path: '/addDoc',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text ",
    },
    {
        title: 'Calendar',
        path: '/cal',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text ",
    },
    
]

export const MenuDataDoc = [
    {
        title: 'Add Patient Details',
        path: '/addPatDetails',
        icon:<AiIcons.AiOutlineReconciliation/>,
        cName: "nav-text",
    },
    {
        title: 'Appointments',
        path: '/getApt/'+ sessionStorage.getItem("userId"),
        icon:<AiIcons.AiOutlineCalendar/>,
        cName: "nav-text",
    }
]