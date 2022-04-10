import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AdminNavbar from './AdminNavbar'
import userImg from "../user.png";
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { getCurrentAdmin } from '../ManagementApp-Services/GetCurrentLogedinDetail'
import { getAllEmployees } from '../ManagementApp-Services/EmployeeServices';
import { getAllProjects } from '../ManagementApp-Services/ProjectServices';
import { getAllTasks } from '../ManagementApp-Services/TaskServices';
import { getAllLeaveRquests } from '../ManagementApp-Services/LeaveRequestServices';

function AdminDashboard() {

    const [token, setToken] = useState("");
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [adminData, setAdminData] = useState([]);
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
        setToken(Token);
        if (Token !== null) {
            getCurrentAdmin(Token)
                .then(data => setAdminData(data))
        }
    }, [])

    useEffect(() => {
        getAllEmployees()
            .then(employees => setEmployees(employees))
        getAllProjects()
            .then(projects => setProjects(projects))
        getAllTasks()
            .then(tasks => setTasks(tasks))
        getAllLeaveRquests()
            .then(leaverequest => setLeaveRequests(leaverequest))
    }, [])


    function getAdminData() {
        return (
            <div className="text-left">
                <li className="list-group-item">Name: {adminData.AdminName}</li>
                <li className="list-group-item">Email: {adminData.AdminEmail}</li>
            </div>
        )
    }

    function getEmployeeCard() {

        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/adminmanageemployee" >
                <Card bg='danger' key='1' style={CardStyle} className="mb-2"  >
                    <Card.Header>EMPLOYEES</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Numbers Of Employees </Card.Title>
                        <Card.Text >
                            {employees.length} employees
                        </Card.Text>
                    </Card.Body>
                </Card></NavLink>
        )
    }
    function getProjectCard() {
        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/adminmanageproject" >
                <Card bg='warning' key='2' style={CardStyle} className="mb-2"  >
                    <Card.Header>PROJECTS</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Numbers Of Projects </Card.Title>
                        <Card.Text>
                            {projects.length} projects
                        </Card.Text>
                    </Card.Body>
                </Card></NavLink>)
    }
    function getTaskCard() {
        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/adminmanageemployee" >
                <Card bg='success' key='2' style={CardStyle} className="mb-2"  >
                    <Card.Header>TASKS</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Numbers Of Tasks </Card.Title>
                        <Card.Text>
                            {tasks.length} tasks
                        </Card.Text>
                    </Card.Body>
                </Card></NavLink>
        )
    }
    function getLeaveRequestCard() {
        return (
            <NavLink style={{ color: "black" }} exact className="nav-link" to="/adminmanageleave" >
                <Card bg='info' key='2' style={CardStyle} className="mb-2"  >
                    <Card.Header>LEAVE REQUEST</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Number Of leave request </Card.Title>
                        <Card.Text>
                            {leaveRequests.length} leave requests
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
                        <AdminNavbar></AdminNavbar></div>
                    <div className="row fw-bolder font-monospace" style={{ marginTop: 30 }}>

                        <div className="col-md-3" style={CardMargin}>
                            {getEmployeeCard()}
                        </div>

                        <div className="col-md-3" style={CardMargin}>
                            {getProjectCard()}
                        </div>

                        <div className="col-md-3" style={CardMargin}>{getTaskCard()}
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img src={userImg} width="auto" height="auto" className="logo" alt="logo" />
                                <div className="card-body">
                                    <h5 className="card-title string">Admin Profile</h5>
                                    {getAdminData()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{ marginBottom: 50 }} >
                            {getLeaveRequestCard()}</div>
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


export default AdminDashboard;