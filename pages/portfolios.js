import React, { Component } from 'react';
import { Link } from './../routes';
import axios from 'axios';

import { Row, Col, Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

class portfolios extends Component{

    static async getInitialProps(){
        let posts = [];

        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = response.data.splice(0, 10);
        } catch (error){
            console.log(error);
        }

        return {
            posts: posts
        };
    }

    renderPost(post, index){
        return (
            <Col md="4">
                <React.Fragment key={index}>
                    <span>
                        <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">Some Position {index}</CardHeader>
                            <CardBody>
                                <p className="portfolio-card-city"> Some Location {index} </p>
                                <CardTitle className="portfolio-card-title">Some Company {index}</CardTitle>
                                <CardText className="portfolio-card-text">Some Description {index}</CardText>
                                <div className="readMore"> </div>
                            </CardBody>
                        </Card>
                    </span>
                </React.Fragment>
            </Col>
        );
    }

    renderPosts(posts){
        return (
            <Row>
                { posts.map((post, index) => this.renderPost(post, index)) }
            </Row>
        );
    }

    render(){
        const { posts } = this.props;
        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolios page">
                    { this.renderPosts(posts) }
                </BasePage>
            </BaseLayout>
        );
    }
}

export default portfolios;