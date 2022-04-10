import React, { useEffect, useState } from "react";
import AdminNavbar from './AdminNavbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllProjects, getProjectByProjectID, addProjectData, updateProjectData, deleteProjectByID } from '../ManagementApp-Services/ProjectServices';
import { getAllEmployees } from '../ManagementApp-Services/EmployeeServices';





function AddUpdateAdminProjectDetails() {

    const [projects, setProjects] = useState([]);
    const [editFormShow, setEditFormShow] = useState(false);
    const [addFormShow, setAddFormShow] = useState(false);
    const [editProject, setEditProject] = useState({});
    const [employees, setEmployees] = useState([]);
    const [dropdownEmployee, setDropdownEmployee] = useState([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [refresh, setRefresh] = useState(false);

    function nameChange(e) {
        setName(e.target.value);
    }

    function dateChange(e) {
        setDate(e.target.value);
    }
    function dropdownchange(e) {

        let value = Array.from(e.target.selectedOptions, option => option.value);
        setDropdownEmployee(value);
    }
    function editProjectDetails() {
        const newProject = editProject;
        newProject.ProjectName = name;
        newProject.ProjectDueDate = date;
        newProject.ProjectEmployeeAssignees = dropdownEmployee;

        updateProjectData(newProject._id, newProject)
            .then(handleFormClose())
            .then(setRefresh(true))
    }

    function saveAddProject() {
        const newProject = editProject;
        newProject.ProjectName = name;
        newProject.ProjectDueDate = date;
        newProject.ProjectEmployeeAssignees = dropdownEmployee;

       
        addProjectData(newProject)
            .then(handleAddFormClose())
            .then(setRefresh(true))
           
    }

    function deleteProjct(e) {
        const projectid = e.currentTarget.value;
        deleteProjectByID(projectid)
            .then(res => console.log(res))
            .then(setRefresh(true))
    }

    const handleEditShow = (e) => {
        const projectid = e.currentTarget.value;
        getProjectByProjectID(projectid)
            .then(data => {
                setName(data.ProjectName)
                setDate(data.ProjectDueDate)
                setEditProject(data)
            });
        setEditFormShow(true)
    };

    const handleAddShow = () => {
        setAddFormShow(true)
    };

    const handleFormClose = () => setEditFormShow(false);
    const handleAddFormClose = () => setAddFormShow(false);

    useEffect(() => {
        getAllProjects()
            .then(projects => setProjects(projects))
        getAllEmployees()
            .then(employees => setEmployees(employees))
    }, [])

    useEffect(() => {
        getAllProjects()
            .then(projects => setProjects(projects))
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


    function getProjectRows() {
        const projectRows = projects.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{item.ProjectName}</td>
                    {/* {item.ProjectEmployeeAssignees.map(home => <td>{home}</td>)} */}
                    <td>{item.ProjectEmployeeAssignees}</td>
                    <td>{item.ProjectDueDate}</td>
                    <td><button type="button" className="btn btn-outline-primary" value={item._id} onClick={handleEditShow}><i className="fas fa-edit"></i></button></td>
                    <td><button type="button" className="btn btn-outline-danger" value={item._id} onClick={deleteProjct}><i className="far fa-trash-alt"></i></button></td>
                </tr>
            )
        })
        return projectRows;
    }


    return (
        <div className="container">
            <div className="row" style={{ marginTop: 10 }}>
                <AdminNavbar></AdminNavbar>
            </div>
            <div className="row" style={{ marginTop: 30 }}>
                <div className="mb-2">
                    <Button variant="secondary" size="lg" onClick={handleAddShow}>
                        ADD PROJECT
                    </Button></div>
            </div>
            <table className="table mt-5" style={{ marginTop: 30 }}>
                <thead>
                    <tr>
                        <th scope="col">Project Name</th>
                        <th scope="col">Project Assignees</th>
                        <th scope="col">Project DueDate</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getProjectRows()}
                    <Modal show={editFormShow} onHide={handleFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>PROJECTS</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Edit Project:{editProject.ProjectName} </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-square"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Project name" type="text" onChange={nameChange} value={name}></input>
                                </div>
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
                                    <input name="" className="form-control" placeholder="Project Dua Date Must be in(yyyy-mm-dd)" type="email" onChange={dateChange} value={date}></input>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editProjectDetails}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={addFormShow} onHide={handleAddFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>PROJECT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4 className="card-title mt-3 text-center"> Add NEW PROJECT </h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-square"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Project name" type="text" onChange={nameChange} value={name}></input>
                                </div>
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
                                    <input name="" className="form-control" placeholder="Project Dua Date Must be in(yyyy-mm-dd)" type="email" onChange={dateChange} value={date}></input>
                                </div>

                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={handleAddFormClose}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={saveAddProject}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>
        </div>
    )
}

export default AddUpdateAdminProjectDetails;