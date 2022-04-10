import React, { useEffect, useState } from "react";
import AdminNavbar from './AdminNavbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllMeetings, getMeetingByMeetingID, addMeetingData, updateMeetingData, deleteMeetingByID } from '../ManagementApp-Services/MeetingService';
import { getAllEmployees } from '../ManagementApp-Services/EmployeeServices';
import { getCurrentAdmin } from '../ManagementApp-Services/GetCurrentLogedinDetail'

function MeetingAdminAddUpdate() {

    const [adminData, setAdminData] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [editFormShow, setEditFormShow] = useState(false);
    const [addFormShow, setAddFormShow] = useState(false);
    const [editMeeting, setEditMeeting] = useState({});
    const [employees, setEmployees] = useState([]);
    const [dropdownEmployee, setDropdownEmployee] = useState([]);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [refresh, setRefresh] = useState(false);

    function timeChange(e) {
        setTime(e.target.value);
    }

    function dateChange(e) {
        setDate(e.target.value);
    }
    function dropdownchange(e) {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setDropdownEmployee(value);
    }

    function editMeetingDetails() {
        const newMeeting = editMeeting;
        newMeeting.MeetingDate = date;
        newMeeting.MeetingTime = time;
        newMeeting.EmployeesID = dropdownEmployee;
        newMeeting.MeetingCreatedBy = adminData._id;

        updateMeetingData(newMeeting._id, newMeeting)
            .then(handleFormClose())
            .then(setRefresh(true))
    }
    function saveAddMeeting() {
        const newMeeting = editMeeting;
        newMeeting.MeetingDate = date;
        newMeeting.MeetingTime = time;
        newMeeting.EmployeesID = dropdownEmployee;
        newMeeting.MeetingCreatedBy = adminData._id;

        addMeetingData(newMeeting)
            .then(handleAddFormClose())
            .then(setRefresh(true))
    }

    function deleteMeeting(e) {
        const meetingid = e.currentTarget.value;
        deleteMeetingByID(meetingid)
            .then(res => console.log(res))
            .then(setRefresh(true))
    }
    const handleEditShow = (e) => {
        const meetingid = e.currentTarget.value;
        getMeetingByMeetingID(meetingid)
            .then(data => {
                setDate(data.MeetingDate)
                setTime(data.MeetingTime)
                setDropdownEmployee(data.EmployeesID)
                setEditMeeting(data)
            });
        setEditFormShow(true)
    };

    const handleAddShow = () => {
        setAddFormShow(true)
    };

    const handleFormClose = () => setEditFormShow(false);
    const handleAddFormClose = () => setAddFormShow(false);

    useEffect(() => {
        if (sessionStorage.getItem('refresh')) {
            sessionStorage.removeItem('refresh');
            window.location.reload();
        }
        const Token = sessionStorage.getItem('token');
        if (Token !== null) {
            getCurrentAdmin(Token)
                .then(data => setAdminData(data))
        }
        getAllMeetings()
            .then(meeting => setMeetings(meeting))
        getAllEmployees()
            .then(employees => setEmployees(employees))
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('refresh')) {
            sessionStorage.removeItem('refresh');
            window.location.reload();
        }
        const Token = sessionStorage.getItem('token');
        if (Token !== null) {
            getCurrentAdmin(Token)
                .then(data => setAdminData(data))
        }
        getAllMeetings()
            .then(projects => setMeetings(projects))
            .then(setRefresh(false))
        getAllEmployees()
            .then(employees => setEmployees(employees))
    }, [refresh])



    function getDropdownMenu() {
        const dropdowns =
            <select className="form-control" onChange={dropdownchange} multiple >
                {employees.map((option, key) => (
                    <option name={option.EmployeeName} id={option.EmployeeName} value={option.EmployeeName} key={key}>{option.EmployeeName}</option>
                ))}
            </select>

        return dropdowns;
    }


    function getMeetingRows() {
        const meetingRows = meetings.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item.EmployeesID}</td>
                    <td>{item.MeetingDate}</td>
                    <td>{item.MeetingTime}</td>
                    <td><button type="button" className="btn btn-outline-primary" value={item._id} onClick={handleEditShow}><i className="fas fa-edit"></i></button></td>
                    <td><button type="button" className="btn btn-outline-danger" value={item._id} onClick={deleteMeeting}><i className="far fa-trash-alt"></i></button></td>
                </tr>
            )
        })
        return meetingRows;
    }
    return (
        <div className="container">
            <div className="row" style={{ marginTop: 10 }}>
                <AdminNavbar></AdminNavbar>
            </div>
            <div className="row" style={{ marginTop: 30 }}>
                <div className="mb-2">
                    <Button variant="secondary" size="lg" onClick={handleAddShow}>
                        ADD MEETING
                    </Button></div>
            </div>
            <table className="table mt-5" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th scope="col">Meeting's Attendees</th>
                        <th scope="col">Meeting Date</th>
                        <th scope="col">Meeting Time</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getMeetingRows()}
                    <Modal show={editFormShow} onHide={handleFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>MEETING</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> EDIT MEETING </h4>
                            <form>
                                <div className="form-group input-group" >
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-caret-down"></i> </span>
                                    </div>
                                    <select className="form-control" onChange={dropdownchange} style={{ height: 80 }} multiple>
                                        {employees.map((option, key) => (
                                            <option name={option.EmployeeName} id={option.EmployeeName} value={option.EmployeeName} key={key} >{option.EmployeeName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Meeting Date(Must be in yyyy-mm-dd format)" type="text" onChange={dateChange} value={date}></input>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-clock-o"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Meeting Time(must be number(0-24))" type="text" onChange={timeChange} value={time}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editMeetingDetails}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={addFormShow} onHide={handleAddFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>MEETING</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Add NEW MEETING </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-caret-down"></i> </span>
                                    </div>
                                    {getDropdownMenu()}
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Meeting Date(Must be in yyyy-mm-dd format)" type="text" onChange={dateChange} value={date}></input>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-clock-o"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Meeting Time(must be number(0-24))" type="text" onChange={timeChange} value={time}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleAddFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={saveAddMeeting}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>
        </div>
    )

}

export default MeetingAdminAddUpdate;