import React from "react";
import { Redirect } from "react-router-dom";

function Logout() {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('refresh', true);
    return (
        <Redirect to="/"></Redirect>
    )
}

export default Logout;