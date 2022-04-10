import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../logo.png';


function AdminNavbar(props) {


    const pageLinks = [
        { linkName: "Home", linkVal: "adminhome" },
        { linkName: "Employee", linkVal: "adminmanageemployee" },
        { linkName: "Project", linkVal: "adminmanageproject" },
        { linkName: "Leave Request", linkVal: "adminmanageleave" },
        { linkName: "Meetings", linkVal: "adminmanagemeetings" },
        { linkName: "Logout", linkVal: "logout" }
        // { linkName: "Graphical Data", linkVal: "graphicalpresentation" }
    ]

    function getLinks() {
        const links = pageLinks.map((link, key) => {
            return (
                <NavLink exact activeClassName="nav-link active" className="nav-link" to={"/" + link.linkVal} key={key}>{link.linkName}</NavLink>
            )

        });
        return links;
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <Nav>
                    <NavLink exact className="nav-link active display-" to="/adminhome">
                        <img src={logo} width="60" height="auto" className="logo" alt="logo" />
                        Employee Management Admin Side
                    </NavLink>
                </Nav>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {getLinks()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )


}

export default AdminNavbar;