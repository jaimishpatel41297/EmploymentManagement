import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';


import Login from './ManagementApp-Components/LogIn';
import EmployeeDashboard from './ManagementApp-Components/EmployeeDashboard';
import AdminDashboard from './ManagementApp-Components/AdminDashboard';
import AddUpdateEmployee from './ManagementApp-Components/AddUpdateEmployee';
import AddUpdateAdminProjectDetails from './ManagementApp-Components/AddUpdateAdminProjectDetails';
import AdminLeaveRequest from './ManagementApp-Components/AdminLeaveRequest';
import MeetingAdminAddUpdate from './ManagementApp-Components/MeetingAdminAddUpdate';
import EmployeePunchInPunchout from './ManagementApp-Components/EmployeePunchInPunchout';
import AddUpdateEmployeeProjectDetails from './ManagementApp-Components/AddUpdateEmployeeProjectDetails';
import EmployeeLeaveRequestAddUpdate from './ManagementApp-Components/EmployeeLeaveRequestAddUpdate';
//import MeetingEmployeeAddUpdate from './ManagementApp-Components/MeetingEmployeeAddUpdate';
import Logout from './ManagementApp-Components/Logout';
import Footer from './ManagementApp-Components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/admin" exact component={AdminDashboard}></Route>
          <Route path="/adminhome" exact component={AdminDashboard}></Route>

          <Route path="/adminmanageemployee" exact component={AddUpdateEmployee}></Route>
          <Route path="/adminmanageproject" exact component={AddUpdateAdminProjectDetails}></Route>
          <Route path="/adminmanageleave" exact component={AdminLeaveRequest}></Route>
          <Route path="/adminmanagemeetings" exact component={MeetingAdminAddUpdate}></Route>
          <Route path="/employee" exact component={EmployeeDashboard}></Route>
          <Route path="/employeehome" exact component={EmployeeDashboard}></Route>
          <Route path="/employeemanageproject" exact component={AddUpdateEmployeeProjectDetails}></Route>
          <Route path="/employeeattendance" exact component={EmployeePunchInPunchout}></Route>
          <Route path="/employeemanageleave" exact component={EmployeeLeaveRequestAddUpdate}></Route>
          {/*
          
    
         
        
          <Route path="/employeemanagemeetings" exact component={MeetingEmployeeAddUpdate}></Route> */}
          {/* <Route path="/employeeexportcsv" exact component={}}></Route> */}
          <Route path="/logout" exact component={Logout}></Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
