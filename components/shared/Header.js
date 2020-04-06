import React, { Component } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import auth0 from './../../services/auth0';

const BootstrapNavLink = (props) => {
    const { route, title } = props;

    return(
        <Link href={route}><a className="nav-link port-navbar-link">{title}</a></Link>
    )
};

const Login = () => {
    return(
        <span onClick={auth0.login} className="nav-link port-navbar-link">Login</span>
    )
};

const Logout = () => {
    return(
        <span onClick={auth0.logout} className="nav-link port-navbar-link">Logout</span>
    )
};

/* const Logout = (props) => {
    const { user } = props;

    return(
        <span onClick={auth0.logout} className="nav-link port-navbar-link">({user.name}) Logout</span>
    )
}; */


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        //const { isAuthenticated, user } = this.props;
        const { isAuthenticated, className } = this.props;
        return (
            <div>
                <Navbar className={`port-navbar port-nav-base ${className}`} color="transparent" dark expand="md">
                    <NavbarBrand className="port-navbar-brand" href="/">Majid Fatahi</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="port-navbar-item">
                                <BootstrapNavLink route="/" title="Home" />
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BootstrapNavLink route="/about" title="About" />
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BootstrapNavLink route="/blogs" title="Blogs" />
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BootstrapNavLink route="/portfolios" title="Portfolios" />
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BootstrapNavLink route="/cv" title="CV" />
                            </NavItem>
                                { isAuthenticated ?
                                    <NavItem className="port-navbar-item">
                                        <Logout />
                                    </NavItem>
                                    :
                                    <NavItem className="port-navbar-item">
                                        <Login />
                                    </NavItem>
                                }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;