import React, { useEffect, useState } from "react";
import AdminNavbar from './AdminNavbar';
import { getLeaveRequestByStatus, updateLeaveRequestData, getLeaveRequestsByleaveID } from '../ManagementApp-Services/LeaveRequestServices';


function AdminLeaveRequest() {

    const [leaves, setLeaves] = useState([]);
    const [leaveflag, setLeaveFlag] = useState(true);
    const [editLeaveData, setEditLeave] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [SaveOppositeleaveflag, setSaveOppositeLeaveFlag] = useState(false);

    const setActisetLEaveRequestFlag = () => {
        setLeaveFlag(true)
        setSaveOppositeLeaveFlag(false)
        setRefresh(true)
    };

    const setRejectedLeaveFlag = () => {
        setLeaveFlag(false)
        setSaveOppositeLeaveFlag(true)
        setRefresh(true)
    };

    useEffect(() => {
        getLeaveRequestByStatus(leaveflag)
            .then(leave => setLeaves(leave))
    }, [])

    useEffect(() => {
        getLeaveRequestByStatus(leaveflag)
            .then(leave => setLeaves(leave))
            .then(setRefresh(false))
    }, [refresh])

    const updateLeaveStatus = (e) => {
        const Leaveid = e.currentTarget.value;
        getLeaveRequestsByleaveID(Leaveid)
            .then(data => {
                setEditLeave(data)
            });
        const newLeave = editLeaveData;
        newLeave.LeaveStatus = SaveOppositeleaveflag;
        updateLeaveRequestData(newLeave._id, newLeave)
            .then(setRefresh(true))
    };


    function getLeaveRequestRows() {
        const leaveRows = leaves.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item.EmployeesID}</td>
                    {<td>  {item.LeaveStatus ? "ACCEPTED" : "REJECTED"} </td>}
                    <td>{item.LeaveStartDate}</td>
                    <td>{item.LeaveEndDate}</td>
                    <td>{item.LeaveReason}</td>
                    <td><button type="button" className="btn btn-outline-danger" value={item._id} onClick={updateLeaveStatus}>Action</button></td>
                </tr>
            )
        })
        return leaveRows;
    }


    return (
        <div className="container">
            <div className="row" style={{ marginTop: 10 }}>
                <AdminNavbar></AdminNavbar>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center" style={{ marginTop: 30 }} >
                <button type="button" class="btn btn-secondary btn-lg active" onClick={setActisetLEaveRequestFlag}>ACCEPTED LEAVES</button>
                <button type="button" class="btn btn-secondary btn-lg" onClick={setRejectedLeaveFlag}>REJECTED LEAVES</button>
            </div>
            <div className="fw-bolder font-monospace justify-content-center" style={{ marginTop: 30 }}>
                {leaveflag ? <p >ACCEPTED LEAVE REQUEST </p> : <p className="fw-bolder">REJECTED LEAVE REQUEST</p>}
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Employee NAME</th>
                        <th scope="col">Leave Satus</th>
                        <th scope="col">Leave Start Date</th>
                        <th scope="col">Leave End Date</th>
                        <th scope="col">Leave LeaveReason</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody style={{ marginTop: 12 }}>
                    {getLeaveRequestRows()}
                </tbody>
            </table>
        </div >
    )


}

export default AdminLeaveRequest;