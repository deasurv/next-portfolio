import { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, CardText, Button } from 'reactstrap';

import PortfolioCardDetails from './PortfolioCardDetails';

export default class PortfolioCard extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        const { portfolio, children } = this.props;
        const { isOpen } = this.state;

        return (
            <Card className="portfolio-card" onClick={this.handleToggle}>
                <PortfolioCardDetails portfolio={portfolio} toggle={this.handleToggle} isOpen={isOpen} />
                <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
                <CardBody>
                    <p className="portfolio-card-city">{portfolio.location}</p>
                    <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
                    <CardText className="portfolio-card-text">{portfolio.description}</CardText>
                    <div className="readMore">{ children }</div>
                </CardBody>
            </Card>
        );
    }
}