import React, { Component } from 'react';
import { Link } from './../routes';

import { Row, Col, Card, CardHeader, CardTitle, CardBody, CardText, Button } from 'reactstrap';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import { getPortfolios } from './../actions';
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
                <React.Fragment>
                    <span>
                        <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
                            <CardBody>
                                <p className="portfolio-card-city">{portfolio.location}</p>
                                <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
                                <CardText className="portfolio-card-text">{portfolio.description}</CardText>
                                { isAuthenticated && isSiteOwner &&
                                    <div className="readMore">
                                        <Button color="primary" onClick={() => Router.pushRoute(`/portfolios/${portfolio._id}/edit`)}>Edit</Button> <Button color="danger">Delete</Button>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </span>
                </React.Fragment>
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