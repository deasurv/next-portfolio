import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import PortfolioForm from './../components/portfolios/PortfolioForm';

import withAuth from './../components/hoc/withAuth';

class PortfolioNew extends Component{

    savePortfolio = portfolioData => {
        alert(JSON.stringify(portfolioData, null, 2));
    }

    render(){
        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Create new portfolio">
                    <Row>
                        <Col md="6">
                            <PortfolioForm onSubmit={this.savePortfolio} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(PortfolioNew);