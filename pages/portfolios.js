import React, { Component } from 'react';
import { Link } from './../routes';

import { Row, Col, Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import { getPortfolios } from './../actions';

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
                                <div className="readMore"></div>
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
        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolios page">
                    { this.renderPortfolios(portfolios) }
                </BasePage>
            </BaseLayout>
        );
    }
}

export default portfolios;