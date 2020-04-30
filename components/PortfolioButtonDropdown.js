import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class PortfolioButtonDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    renderMenu(items) {
        return (
            <DropdownMenu>
                { items.map((item, index) => <DropdownItem key={index} {...item.handlers}>{item.text}</DropdownItem>) }
            </DropdownMenu>
        );
    }

    render() {
        const { items } = this.props;

        return (
            <ButtonDropdown className="port-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret size="sm"></DropdownToggle>
                {this.renderMenu(items)}
            </ButtonDropdown>
        );
    }
}