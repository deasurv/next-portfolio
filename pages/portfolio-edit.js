import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import PortfolioForm from './../components/portfolios/PortfolioForm';

import { createPortfolio, getPortfolioByID } from './../actions';

import withAuth from './../components/hoc/withAuth';
import { Router } from './../routes';

class PortfolioEdit extends Component{

    state = {
        error: undefined
    };

    static async getInitialProps({ query }){
        let portfolio = {};

        try{
            portfolio = await getPortfolioByID(query.id);
        }catch(error){
            console.log(error);
        }

        return { portfolio };
    }

    savePortfolio = (portfolioData, { setSubmitting }) => {
        /* setSubmitting(true);

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
        }); */
    }

    render(){
        const { error } = this.state;
        const { portfolio } = this.props;

        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Update portfolio">
                    <Row>
                        <Col md="6">
                            <PortfolioForm initialValues={portfolio} onSubmit={this.savePortfolio} error={error} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(PortfolioEdit);