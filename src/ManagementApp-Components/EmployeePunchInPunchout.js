import React, { useEffect, useState } from "react";
import EmployeeNavbar from './EmployeeNavbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAttendanceDataByID, addAttendanceData, updateAttendanceData, getAttendanceDataByEmployee } from '../ManagementApp-Services/EmployeeAttendance';



function EmployeePunchInPunchout() {

    const [attendance, setAttendance] = useState([]);
    const [editFormShow, setEditFormShow] = useState(false);
    const [addFormShow, setAddFormShow] = useState(false);
    const [editAttendance, setEditAttendance] = useState({});
    const [punchInTime, setPunchInTime] = useState("");
    const [punchOutTime, setPunchOutTime] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [refresh, setRefresh] = useState(false);


    function puchInChange(e) {
        setPunchInTime(e.target.value);
    }

    function puchOutChange(e) {
        setPunchOutTime(e.target.value);
    }

    function dateChange(e) {
        setDate(e.target.value);
    }

    function locationChange(e) {
        setLocation(e.target.value);
    }

    function editAttendanceDetails() {
        const newAttendance = editAttendance;
        newAttendance.PunchInTime = punchInTime;
        newAttendance.PunchOutTime = punchOutTime;
        newAttendance.AttendanceDate = date;
        newAttendance.AttendanceLocation = location;
        newAttendance.EmployeesID = sessionStorage.getItem('userName');

        updateAttendanceData(newAttendance._id, newAttendance)
            .then(handleFormClose())
            .then(setRefresh(true))

        setEditAttendance("")
    }

    function saveAddAttendance() {
        const newAttendance = editAttendance;
        newAttendance.PunchInTime = punchInTime;
        newAttendance.PunchOutTime = punchOutTime;
        newAttendance.AttendanceDate = date;
        newAttendance.AttendanceLocation = location;

        const empName = sessionStorage.getItem('userName');
        addAttendanceData(empName, newAttendance)
            .then(handleAddFormClose())
            .then(setRefresh(true))
    }

    const handleEditShow = (e) => {
        const attendanceid = e.currentTarget.value;
        getAttendanceDataByID(attendanceid)
            .then(data => {
                setPunchInTime(data.PunchInTime)
                setPunchOutTime(data.PunchOutTime)
                setDate(data.AttendanceDate)
                setLocation(data.AttendanceLocation)
                setEditAttendance(data)
            });
        setEditFormShow(true)
    };
    const handleAddShow = () => {
        setAddFormShow(true)
    };

    const handleFormClose = () => setEditFormShow(false);
    const handleAddFormClose = () => setAddFormShow(false);

    useEffect(() => {
        const username = sessionStorage.getItem('userName');
        getAttendanceDataByEmployee(username)
            .then(attendance => setAttendance(attendance))
    }, [])

    useEffect(() => {
        const username = sessionStorage.getItem('userName');
        getAttendanceDataByEmployee(username)
            .then(attendance => setAttendance(attendance))
            .then(setRefresh(false))
    }, [refresh])

    function getAttendanceRows() {
        const attendanceRows = attendance.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item._id}</td>
                    <td>{item.PunchInTime}</td>
                    <td>{item.PunchOutTime}</td>
                    <td>{item.AttendanceDate}</td>
                    <td>{item.AttendanceLocation}</td>
                    <td><button type="button" className="btn btn-outline-primary" value={item._id} onClick={handleEditShow}><i className="fas fa-edit"></i></button></td>
                </tr>
            )
        })
        return attendanceRows;
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: 10 }}>
                <EmployeeNavbar></EmployeeNavbar>
            </div>
            <div className="row" style={{ marginTop: 30 }}>
                <div className="mb-2">
                    <Button variant="secondary" size="lg" onClick={handleAddShow}>
                        Add Attendance
                    </Button></div>
            </div>
            <table className="table mt-5" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PunchIN Time</th>
                        <th scope="col">PunchOut Time</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {getAttendanceRows()}
                    <Modal show={editFormShow} onHide={handleFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee Attendance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Edit Attendance For:{sessionStorage.getItem('userName')} </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-clock-o"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Punch IN TIME(must be between 0-24)" type="number" onChange={puchInChange} value={punchInTime}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-clock-o"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Punch OUT TIME(must be between 0-24)" type="number" onChange={puchOutChange} value={punchOutTime}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Date (must be in yyyy-dd-mm format)" type="number" onChange={dateChange} value={date}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Location" type="email" onChange={locationChange} value={location}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editAttendanceDetails}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={addFormShow} onHide={handleAddFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Add New Attendance </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-clock-o"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Punch IN TIME(must be between 0-24)" type="number" onChange={puchInChange} value={punchInTime}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-clock-o"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Punch OUT TIME(must be between 0-24)" type="number" onChange={puchOutChange} value={punchOutTime}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Date (must be in yyyy-dd-mm format)" type="number" onChange={dateChange} value={date}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Location" type="email" onChange={locationChange} value={location}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleAddFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={saveAddAttendance}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>

        </div>

    )

}

export default EmployeePunchInPunchout;