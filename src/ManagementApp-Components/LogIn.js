import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login, Adminlogin } from '../ManagementApp-Services/LoginService';

function Login() {

    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userloginFlag, setUserLoginFlag] = useState(true);
    const [adminloginFlag, setAdminLoginFlag] = useState(false);
    const [loginFlag, setLoginFlag] = useState(false);




    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function emailChange(e) {
        setEmail(e.target.value);

    }

    function checkchange(e) {
        if (e.target.checked) {
            setAdminLoginFlag(true);
            setUserLoginFlag(false);
        } else {
            setAdminLoginFlag(false);
            setUserLoginFlag(true);
        }
    }

    function getToken(e) {
        e.preventDefault();
        console.log({ "email": email, "password": password, "AdminFlag": adminloginFlag, "UserFlag": userloginFlag })

        if (adminloginFlag) {
            const admin = {
                AdminEmail: email,
                AdminPassword: password
            }
            Adminlogin(admin)
                .then(admin_token => {
                    let { token } = admin_token;
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('refresh', true);
                    console.log(sessionStorage.getItem('token'));
                })
        }
        else {
            const employee = {
                EmployeeEmail: email,
                EmployeePassword: password
            }
            login(employee)
                .then(employee_token => {
                    let { token } = employee_token;
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('refresh', true);
                    sessionStorage.setItem('userName', employee_token.employeename);
                    console.log(employee_token.employeename)
                })
        }

        if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === 'undefined' || sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === 'null') {
            setLoginFlag(false);
        }
        else {
            setLoginFlag(true);
        }

        if (loginFlag && userloginFlag) {
            history.push("/employee");
        }
        else if (loginFlag && adminloginFlag) {
            history.push("/admin");
        }
        else {
            history.push("/");
        }
    }


    //style={{backgroundColor: 'grey' }}
    return (
        <div className="container" style={{ backgroundColor: 'grey', marginTop: 200 }}>
            <div className="card bg-light">
                <article className="card-body mx-auto" >
                    <h4 className="card-title text-center">Log In</h4>
                    <form>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input name="" className="form-control" placeholder="Email address" type="email" onChange={emailChange}></input>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input className="form-control" placeholder="Password" type="password" onChange={passwordChange}></input>
                        </div>
                        <div class="form-check">
                            <input className="form-check-input" type="checkbox" value="admin" onChange={(e) => {
                                checkchange(e)
                            }
                            }></input>
                            <label className="form-check-label" for="flexCheckDefault">
                                Admin
                            </label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" onClick={getToken}>Login</button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    )
}
export default Login;