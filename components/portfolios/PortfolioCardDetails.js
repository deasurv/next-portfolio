import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import moment from 'moment';

class PortfolioCardDetails extends Component {

    render() {
        const { portfolio, isOpen, toggle } = this.props;
        return (
            <div>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{portfolio.title}</ModalHeader>
                    <ModalBody>
                        <p><span className="portfolio-detail-title">Description: </span>{portfolio.description}</p>
                        <p><span className="portfolio-detail-title">Company: </span>{portfolio.company}</p>
                        <p><span className="portfolio-detail-title">Position: </span>{portfolio.position}</p>
                        <p><span className="portfolio-detail-title">Location: </span>{portfolio.location}</p>
                        <p><span className="portfolio-detail-title">Start date: </span>{moment(portfolio.startDate).format('YYYY/MM/DD')}</p>
                        <p><span className="portfolio-detail-title">End date: </span>{portfolio.endDate ? moment(portfolio.endDate).format('YYYY/MM/DD') : 'Still working here!'}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default PortfolioCardDetails;