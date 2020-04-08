import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import PortfolioForm from './../components/portfolios/PortfolioForm';

import { createPortfolio } from './../actions';

import withAuth from './../components/hoc/withAuth';
import { Router } from './../routes';

class PortfolioNew extends Component{

    state = {
        error: undefined
    };

    savePortfolio = (portfolioData, { setSubmitting }) => {
        setSubmitting(true);

        createPortfolio(portfolioData)
        .then(portfolio => {
            setSubmitting(false);
            this.setState({error: undefined});
            Router.pushRoute('/portfolios');
        })
        .catch(err => {
            const error = err.message || 'Server error!';
            setSubmitting(false);
            this.setState({ error });
        });
    }

    render(){
        const { error } = this.state;
        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Create new portfolio">
                    <Row>
                        <Col md="6">
                            <PortfolioForm onSubmit={this.savePortfolio} error={error} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(PortfolioNew);