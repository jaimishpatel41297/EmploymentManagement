import React, { useEffect, useState } from "react";
import EmployeeNavbar from './EmployeeNavbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getLeaveRequestsByleaveID, getLeaveRequestByEmployeeId, addLeaveRequestData, updateLeaveRequestData, deleteLeaveRequestByID } from '../ManagementApp-Services/LeaveRequestServices';


function EmployeeLeaveRequestAddUpdate() {

    const [leavedata, setLeaveData] = useState([]);
    const [editFormShow, setEditFormShow] = useState(false);
    const [addFormShow, setAddFormShow] = useState(false);
    const [editLeave, setEditLeave] = useState({});
    const [leavestartdate, setLeaveStartDate] = useState("");
    const [leaveenddate, setLeaveEndDate] = useState("");
    const [leavereason, setLeaveReason] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [startLeaveStatus, setStartLeaveStatus] = useState(false);

    function startdateChange(e) {
        setLeaveStartDate(e.target.value);
    }

    function enddateChange(e) {
        setLeaveEndDate(e.target.value);
    }

    function leavereasonChange(e) {
        setLeaveReason(e.target.value);
    }

    function editLeaveDetails() {
        const newLeave = editLeave;
        newLeave.LeaveStartDate = leavestartdate;
        newLeave.LeaveEndDate = leaveenddate;
        newLeave.LeaveReason = leavereason;

        updateLeaveRequestData(newLeave._id, newLeave)
            .then(handleFormClose())
            .then(setRefresh(true))

        setEditLeave("")
    }

    function saveAddLeave() {
        const newLeave = editLeave;
        newLeave.LeaveStartDate = leavestartdate;
        newLeave.LeaveEndDate = leaveenddate;
        newLeave.LeaveReason = leavereason;
        newLeave.EmployeesID = sessionStorage.getItem('userName');
        newLeave.LeaveStatus = startLeaveStatus;

        addLeaveRequestData(sessionStorage.getItem('userName'), newLeave)
            .then(handleAddFormClose())
            .then(setRefresh(true))
    }

    function deleteLeave(e) {
        const leaveid = e.currentTarget.value;
        deleteLeaveRequestByID(leaveid)
            .then(res => console.log(res))
            .then(setRefresh(true))
    }

    const handleEditShow = (e) => {
        const leaveid = e.currentTarget.value;
        getLeaveRequestsByleaveID(leaveid)
            .then(data => {
                setLeaveStartDate(data.LeaveStartDate)
                setLeaveEndDate(data.LeaveEndDate)
                setLeaveReason(data.LeaveReason)
                setEditLeave(data)
            });
        setEditFormShow(true)
    };

    const handleAddShow = () => {
        setAddFormShow(true)
    };

    const handleFormClose = () => setEditFormShow(false);
    const handleAddFormClose = () => setAddFormShow(false);

    useEffect(() => {
        getLeaveRequestByEmployeeId(sessionStorage.getItem('userName'))
            .then(leave => setLeaveData(leave))
    }, [])

    useEffect(() => {
        getLeaveRequestByEmployeeId(sessionStorage.getItem('userName'))
            .then(leave => setLeaveData(leave))
            .then(setRefresh(false))
    }, [refresh])

    function getLeaveRequestRows() {
        const leaveRows = leavedata.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item._id}</td>
                    {<td>  {item.LeaveStatus ? "ACCEPTED" : "PENDING"} </td>}
                    <td>{item.LeaveStartDate}</td>
                    <td>{item.LeaveEndDate}</td>
                    <td>{item.LeaveReason}</td>
                    <td><button type="button" className="btn btn-outline-primary" value={item._id} onClick={handleEditShow}><i className="fas fa-edit"></i></button></td>
                    <td><button type="button" className="btn btn-outline-danger" value={item._id} onClick={deleteLeave}><i className="far fa-trash-alt"></i></button></td>
                </tr>
            )
        })
        return leaveRows;
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: 10 }}>
                <EmployeeNavbar></EmployeeNavbar>
            </div>
            <div className="row" style={{ marginTop: 30 }}>
                <div className="mb-2">
                    <Button variant="secondary" size="lg" onClick={handleAddShow}>
                        ADD LEAVE REQUEST
                    </Button></div>
            </div>
            <table className="table mt-5" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Leave Satus</th>
                        <th scope="col">Leave Start Date</th>
                        <th scope="col">Leave End Date</th>
                        <th scope="col">Leave Reason</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getLeaveRequestRows()}
                    <Modal show={editFormShow} onHide={handleFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee Leave Request</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Edit Leave For :{sessionStorage.getItem('userName')}</h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Leave Start Date(must be in yyyy-mm-dd format)" type="number" onChange={startdateChange} value={leavestartdate}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Leave End Date(must be in yyyy-mm-dd format)" type="number" onChange={enddateChange} value={leaveenddate}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-bullhorn"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Leave Reason" type="text" onChange={leavereasonChange} value={leavereason}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editLeaveDetails}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={addFormShow} onHide={handleAddFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee Leave Request</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Add NEW LEave Request </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Leave Start Date(must be in yyyy-mm-dd format)" type="number" onChange={startdateChange} value={leavestartdate}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Leave End Date(must be in yyyy-mm-dd format)" type="number" onChange={enddateChange} value={leaveenddate}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-bullhorn"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Leave Reason" type="text" onChange={leavereasonChange} value={leavereason}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleAddFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={saveAddLeave}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>

        </div>

    )

}

export default EmployeeLeaveRequestAddUpdate;