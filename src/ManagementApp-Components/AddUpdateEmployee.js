import React, { useEffect, useState } from "react";
import AdminNavbar from './AdminNavbar';
import { getAllEmployees, addEmployeeData, getEmployee, updateEmployeeData, deleteEmployeeByID } from '../ManagementApp-Services/EmployeeServices';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


function AddUpdateEmployee() {

    const [employees, setEmployees] = useState([]);
    const [editFormShow, setEditFormShow] = useState(false);
    const [addFormShow, setAddFormShow] = useState(false);
    const [editEmployee, setEditEmployee] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [refresh, setRefresh] = useState(false);


    function nameChange(e) {
        setName(e.target.value);
    }

    function emailChange(e) {
        setEmail(e.target.value);
    }

    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function editEmployeeDetails() {
        const newEmployee = editEmployee;
        newEmployee.EmployeeName = name;
        newEmployee.EmployeeEmail = email;

        updateEmployeeData(newEmployee._id, newEmployee)
            .then(handleFormClose())
            .then(setRefresh(true))

        setEditEmployee("")
    }

    function saveAddEmployee() {
        const newEmployee = editEmployee;
        newEmployee.EmployeeName = name;
        newEmployee.EmployeeEmail = email;
        newEmployee.EmployeePassword = password;

        addEmployeeData(newEmployee)
            .then(handleAddFormClose())
            .then(setRefresh(true))
    }

    function deleteEmployee(e) {
        const employeeid = e.currentTarget.value;
        deleteEmployeeByID(employeeid)
            .then(res => console.log(res))
            .then(setRefresh(true))
    }

    const handleEditShow = (e) => {
        const employeeid = e.currentTarget.value;
        getEmployee(employeeid)
            .then(data => {
                setName(data.EmployeeName)
                setEmail(data.EmployeeEmail)
                setEditEmployee(data)
            });
        setEditFormShow(true)
    };

    const handleAddShow = () => {
        setAddFormShow(true)
    };

    const handleFormClose = () => setEditFormShow(false);
    const handleAddFormClose = () => setAddFormShow(false);

    useEffect(() => {
        getAllEmployees()
            .then(employees => setEmployees(employees))
    }, [])

    useEffect(() => {
        getAllEmployees()
            .then(employees => setEmployees(employees))
            .then(setRefresh(false))
    }, [refresh])



    function getEmployeeRows() {
        const employeeRows = employees.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item._id}</td>
                    <td>{item.EmployeeName}</td>
                    <td>{item.EmployeeEmail}</td>
                    <td><button type="button" className="btn btn-outline-primary" value={item._id} onClick={handleEditShow}><i className="fas fa-edit"></i></button></td>
                    <td><button type="button" className="btn btn-outline-danger" value={item._id} onClick={deleteEmployee}><i className="far fa-trash-alt"></i></button></td>
                </tr>
            )
        })
        return employeeRows;
    }


    return (
        <div className="container">
            <div className="row" style={{ marginTop: 10 }}>
                <AdminNavbar></AdminNavbar>
            </div>
            <div className="row" style={{ marginTop: 30 }}>
                <div className="mb-2">
                    <Button variant="secondary" size="lg" onClick={handleAddShow}>
                        ADD EMPLOYEE
                    </Button></div>
            </div>
            <table className="table mt-5" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Employee Email</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getEmployeeRows()}
                    <Modal show={editFormShow} onHide={handleFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Edit EMPLOYEE:{editEmployee.EmployeeName} </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Employee name" type="text" onChange={nameChange} value={name}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Employee Email address" type="email" onChange={emailChange} value={email}></input>
                                </div>


                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editEmployeeDetails}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={addFormShow} onHide={handleAddFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Add NEW EMPLOYEE </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Employee name" type="text" onChange={nameChange} value={name}></input>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Employee Email address" type="email" onChange={emailChange} value={email}></input>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="User Password" type="text" onChange={passwordChange} value={password}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleAddFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={saveAddEmployee}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>

        </div>

    )
}


export default AddUpdateEmployee;