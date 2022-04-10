import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import EmployeeNavbar from './EmployeeNavbar';
import userImg from "../user.png";
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { getCurrentEmployee } from '../ManagementApp-Services/GetCurrentLogedinDetail'
import { getProjectByEmployee } from '../ManagementApp-Services/ProjectServices';
import { getLeaveRequestByEmployeeId } from '../ManagementApp-Services/LeaveRequestServices';
import { getMeetingByEmployee } from '../ManagementApp-Services/MeetingService';


function EmployeeDashboard() {

    const [token, setToken] = useState("");
    const [projects, setProjects] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const CardStyle = {
        width: '18rem', height: '12rem'
    }
    const CardMargin = {
        marginTop: 50
    }

    useEffect(() => {
        if (sessionStorage.getItem('refresh')) {
            sessionStorage.removeItem('refresh');
            window.location.reload();
        }
        const Token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('userName');
        setToken(Token);
        if (Token !== null) {
            getCurrentEmployee(Token)
                .then(data => setEmployeeData(data))
            getProjectByEmployee(username)
                .then(projects => setProjects(projects))
            getLeaveRequestByEmployeeId(username)
                .then(leaverequests => setLeaveRequests(leaverequests))
            getMeetingByEmployee(username)
                .then(meetings => setMeetings(meetings))
        }

    }, [])

    function getEmployeeData() {
        return (
            <div className="text-left">
                <li className="list-group-item">Name: {employeeData.EmployeeName}  </li>
                <li className="list-group-item">Email: {employeeData.EmployeeEmail}</li>
            </div>
        )
    }

    function getProjectCard() {
        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/employeemanageproject" >
                <Card bg='warning' key='2' style={CardStyle} className="mb-2"  >
                    <Card.Header>PROJECTS</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Numbers Of Projects Created By {employeeData.EmployeeName}</Card.Title>
                        <Card.Text>
                            {projects.length} Projects
                        </Card.Text>
                    </Card.Body>
                </Card></NavLink>)
    }

    function getLeaveRequestCard() {
        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/employeemanageleave" >
                <Card bg='info' key='2' style={CardStyle} className="mb-2"  >
                    <Card.Header>LEAVE REQUESTS</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Number Of leave requests Created By  {employeeData.EmployeeName} </Card.Title>
                        <Card.Text>
                            {leaveRequests.length} Leaves
                        </Card.Text>
                    </Card.Body>
                </Card></NavLink>
        )
    }

    function getMeetingCard() {
        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/employeemanagemeetings" >
                <Card bg='success' key='2' style={CardStyle} className="mb-2"  >
                    <Card.Header>MEETINGS</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Numbers Of Meetings Of  {employeeData.EmployeeName} </Card.Title>
                        <Card.Text>
                            {meetings.length} Meetings
                        </Card.Text>
                    </Card.Body>
                </Card></NavLink>
        )
    }


    function getBody() {
        if (token !== null && token !== 'null' && token !== undefined && token !== 'undefined') {
            return (
                <div className="container">
                    <div className="row" style={{ marginTop: 10 }}>
                        <EmployeeNavbar></EmployeeNavbar></div>
                    <div className="row fw-bolder font-monospace" style={{ marginTop: 30 }}>

                        <div className="col-md-3" style={CardMargin}>
                            {getProjectCard()}
                        </div>

                        <div className="col-md-3" style={CardMargin}>
                            {getLeaveRequestCard()}
                        </div>

                        <div className="col-md-3" style={CardMargin}>{getMeetingCard()}
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img src={userImg} width="auto" height="auto" className="logo" alt="logo" />
                                <div className="card-body">
                                    <h5 className="card-title string">Admin Profile</h5>
                                    {getEmployeeData()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else { return (<Redirect to="/"></Redirect>) }
    }
    return (
        getBody()
    )
}

export default EmployeeDashboard;