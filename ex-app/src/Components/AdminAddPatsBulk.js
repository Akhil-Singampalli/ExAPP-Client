import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../utils/edittable";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import { excelupload_URL} from "../utils/URL";

export default class AdminAddPatsBulk extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            cols: [],
            rows: [],
            errorMessage: null,
            columns: [
                {
                    title: "NAME",
                    dataIndex: "name",
                    editable: true
                },
                {
                    title: "PHONE NO",
                    dataIndex: "phone",
                    editable: true
                },
                {
                    title: "Email Id",
                    dataIndex: "email",
                    editable: true
                },
                {
                    title: "Password",
                    dataIndex: "password",
                    editable: true
                },
                {
                    title: "Action",
                    dataIndex: "action",
                    render: (text, record) =>
                        this.state.rows.length >= 1 ? (
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.handleDelete(record.key)}
                            >
                                <Button
                                    className="btn btn-danger"
                                    type="delete"
                                    theme="filled"
                                    style={{ color: "black", fontSize: "15px" }}
                                >
                                    <AiIcons.AiFillDelete /> Delete</Button>
                            </Popconfirm>
                        ) : null
                }
            ]
        };
    }


    handleSave = row => {
        const newData = [...this.state.rows];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setState({ rows: newData });
    };

    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            errorMessage = "You can only upload Excel file!";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "File must be smaller than 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
    }

    fileHandler = event => {
        // console.log("fileList", fileList);
        let fileObj = event

        this.checkFile(fileObj);

        this.setState({ file: fileObj });

        if (!fileObj) {
            this.setState({
                errorMessage: "No file uploaded!"
            });
            return false;
        }
        console.log("fileObj.type:", fileObj.type);
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            this.setState({
                errorMessage: "Unknown file format. Only Excel files are uploaded!"
            });
            return false;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined") {
                        newRows.push({
                            key: index,
                            name: row[0],
                            phone: row[1],
                            email: row[2],
                            password: row[3]
                        });
                    }
                });
                if (newRows.length === 0) {
                    this.setState({
                        errorMessage: "No data found in file!"
                    });
                    return false;
                } else {
                    this.setState({
                        cols: resp.cols,
                        rows: newRows,
                        errorMessage: null
                    });
                }
            }
        });
        return false;
    };

    handleSubmit = async () => {
        console.log("submitting: ", this.state.rows);
        //submit to API
        //if successful, banigate and clear the data
        
        const data = new FormData() 
        data.append('file', this.state.file)
        console.warn(this.state.file);
        let url = excelupload_URL;
 
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.warn(res);
        }).then(response => this.setState({

            usersData: response.data,
            successMessage: "Registration Successfull !!",
            errorMessage: "",
            login: true
        })).catch(error => {
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message, successMessage: "" });
            } else {
                this.setState({ errorMessage: "Server is down", successMessage: "" });
            }
        });

        this.setState({ rows: [] })
        };

        handleDelete = key => {
            const rows = [...this.state.rows];
            this.setState({ rows: rows.filter(item => item.key !== key) });
        };
        handleAdd = () => {
            const { count, rows } = this.state;
            const newData = {
                key: count,
                name: "Name",
                phone: "9999999999",
                email: "@gmail.com",
                password: "password"
            };
            this.setState({
                rows: [newData, ...rows],
                count: count + 1
            });
        };

        render() {
            const components = {
                body: {
                    row: EditableFormRow,
                    cell: EditableCell
                }
            };
            const columns = this.state.columns.map(col => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: record => ({
                        record,
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave: this.handleSave
                    })
                };
            });
            return (
                <div className="App-header">
                    <div className="card container-fluid" style={{ marginTop: "75px", width: "100%" }}>
                        <form className=" form-control">

                            <h1 className="card-header"><b>Upload Patients Data</b></h1>
                            <Row >
                                <Col
                                    span={10}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "5%"
                                    }}
                                >

                                </Col>
                                <Col style={{ float: "right" }} span={10}>
                                    <a
                                        href="/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                    >
                                        Sample excel sheet
                                    </a>
                                </Col>
                                <Col
                                    span={10}

                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    {this.state.rows.length > 0 && (
                                        <div className="form-control col-auto">
                                            <Button
                                                className="btn btn-warning"
                                                onClick={this.handleAdd}
                                                size="large"
                                                type="info"
                                                style={{ float: "left", width: "auto" }}
                                            >
                                                {/* <Icon type="plus" /> */}
                                                Add a row
                                            </Button>{" "}
                                            <Button
                                                className="btn btn-success"
                                                onClick={this.handleSubmit}
                                                size="large"
                                                type="primary"
                                                style={{ width: "auto" }}
                                            >
                                                Submit Data
                                            </Button>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <div>
                                <Upload
                                type="file"
                                    name="file"
                                    beforeUpload={this.fileHandler}
                                    onRemove={() => this.setState({ rows: [] })}
                                    multiple={false}
                                >
                                    <Button className="form-control" style={{ width: "auto", float: "left" }}>
                                        <AiIcons.AiOutlineUpload />
                                        Click to Upload Excel File
                                    </Button>
                                </Upload>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Table
                                    className="table card container-fluid"
                                    components={components}
                                    rowClassName={() => "editable-row"}
                                    dataSource={this.state.rows}
                                    columns={columns}
                                />
                            </div>
                        </form>

                    </div>
                </div>
            );
        }
    }
