import React, { Component, Fragment } from 'react';
import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';
import { Row, Col, Button } from 'reactstrap';
import PortfolioCard from './../components/portfolios/PortfolioCard';

import { getPortfolios, deletePortfolio } from './../actions';
import { Router } from './../routes';

class portfolios extends Component{

    static async getInitialProps(){
        let portfolios = [];

        try{
            portfolios = await getPortfolios();
        }catch(error){
            console.log(error);
        }

        return { portfolios };
    }

    renderPortfolio(portfolio, index){
        const { isAuthenticated, isSiteOwner } = this.props.auth;

        return (
            <Col md="4" key={index}>
                <PortfolioCard portfolio={portfolio}>
                    { isAuthenticated && isSiteOwner &&
                        <Fragment>
                            <Button color="primary" onClick={() => Router.pushRoute(`/portfolios/${portfolio._id}/edit`)}>Edit</Button> <Button color="danger" onClick={() => this.displayDeleteWarning(portfolio._id)}>Delete</Button>
                        </Fragment>
                    }
                </PortfolioCard>
            </Col>
        );
    }

    renderPortfolios(portfolios){
        return (
            <Row>
                { portfolios.map((portfolio, index) => this.renderPortfolio(portfolio, index)) }
            </Row>
        );
    }

    displayDeleteWarning(portfolioID){
        const isConfirmed = window.confirm('Are you sure to delete this portfolio?!');

        if(isConfirmed){
            this.deletePortfolio(portfolioID);
        }
    }

    async deletePortfolio(portfolioID){
        try{
            const responce = await deletePortfolio(portfolioID);
            Router.pushRoute('/portfolios');
        }catch(error){
            console.log(error);
        }
    }

    render(){
        const { portfolios } = this.props;
        const { isAuthenticated, isSiteOwner } = this.props.auth;
        
        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolios page">
                    { isAuthenticated && isSiteOwner &&
                        <Button className="create-portfolio-btn" color="success" onClick={() => Router.pushRoute('/portfolio-new')}>Create new Portfolio</Button>
                    }
                    { this.renderPortfolios(portfolios) }
                </BasePage>
            </BaseLayout>
        );
    }
}

export default portfolios;