import React from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class NavigationBar extends React.Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Link to={"/"} className="navbar-brand">
                        <Navbar.Brand>Old Timer</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {localStorage.getItem('userName') === null ?
                            <Nav className="me-auto"/> :
                            <Nav className="me-auto">
                                <Link to={"game"} className="nav-link">Games</Link>
                                <Link to={"about"} className="nav-link">About</Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
