import React, { Component } from 'react';

import Link from 'next/link';
import ActiveLink from './../ActiveLink';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, DropdownMenu, Dropdown, DropdownItem, DropdownToggle  } from 'reactstrap';

import auth0 from './../../services/auth0';

const BootstrapNavLink = (props) => {
    const { route, title } = props;
    const className = props.className || '';

    return(
        <ActiveLink route={route} activeClassName="active">
            <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
        </ActiveLink>
    );
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

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    renderBlogMenu(){
        const { isSiteOwner } = this.props;

        if(isSiteOwner){
            return (
                <Dropdown className="port-navbar-link port-dropdown-menu" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle className="port-dropdown-toggle" nav caret>Blog</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <BootstrapNavLink className="port-dropdown-item" route="/blogs/new" title="Create an story" />
                        </DropdownItem>
                        <DropdownItem>
                            <BootstrapNavLink className="port-dropdown-item" route="/blogs" title="Published stories" />
                        </DropdownItem>
                        <DropdownItem>
                            <BootstrapNavLink className="port-dropdown-item" route="/blogs/dashboard" title="Blog Dashboard" />
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
        }

        return(
            <NavItem className="port-navbar-item">
                <BootstrapNavLink route="/blogs" title="Blogs" />
            </NavItem>
        );
    }
    render() {
        const { isAuthenticated, className } = this.props;
        const { isOpen } = this.state;
        
        return (
            <div>
                <Navbar className={`port-navbar port-nav-base ${className} ${isOpen ? 'menu-open' : 'menu-close'}`} color="transparent" dark expand="md">
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
                            { this.renderBlogMenu() } 
                            <NavItem className="port-navbar-item">
                                <BootstrapNavLink route="/portfolios" title="Portfolios" />
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