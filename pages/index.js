import React, { Component } from 'react';
import Typed from 'react-typed'

import BaseLayout from './../components/layouts/BaseLayout';

import { Container, Row, Col, Button } from 'reactstrap';

class index extends Component{

    constructor(props){
        super(props);

        this.state = {
            isFlipping: false
        };

        this.roles = ['Front-end Developer', 'HTML', 'CSS', 'Sass', 'JavaScript', 'React']
    }

    animateCard(){
        this.cardAnimationInterval = setInterval(() => {
            this.setState({
                isFlipping: !this.state.isFlipping
            });
        }, 5000)
    }

    componentDidMount(){
        this.animateCard();
    }

    componentWillUnmount(){
        this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
    }

    render(){
        const { isFlipping } = this.state;

        return(
            <BaseLayout className={`cover ${isFlipping && 'cover-1'}`} {...this.props.auth} headerType="index" title="Majid Fatahi - Portfolio">
                <div className="main-section">
                    <div className="background-image">
                        <img src="/static/images/background-index.png" />
                    </div>

                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="hero-section">
                                    <div className={`flipper ${isFlipping && 'is-flipping'}`}>
                                        <div className="front">
                                            <div className="hero-section-content">
                                                <h2> Front-end Web Developer </h2>
                                                <div className="hero-section-content-intro">Have a look at my portfolio and job history.</div>
                                            </div>
                                            <img className="image" src="/static/images/section-1.png" alt="Web developer"/>
                                            <div className="shadow-custom">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                        <div className="back">
                                            <div className="hero-section-content">
                                                <h2> Get your projects done! </h2>
                                                <div className="hero-section-content-intro">Top quality in web development!</div>
                                            </div>
                                            <img className="image" src="/static/images/section-2.png" alt="Web developer"/>
                                            <div className="shadow-custom shadow-custom-2">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6" className="hero-welcome-wrapper">
                                <div className="hero-welcome-text">
                                    <h1>Welcome to the portfolio website of Majid Fatahi. Get informed, collaborate and discover projects I was working on through the years!</h1>
                                </div>
                                <Typed
                                    className="self-typed"
                                    loop
                                    typeSpeed={60}
                                    backSpeed={30}
                                    strings={this.roles}
                                    smartBackspace
                                    backDelay={1000}
                                    showCursor
                                    cursorChar=" _"
                                />
                                <div className="hero-welcome-bio">
                                    <h2>Let's take a look on my work.</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </BaseLayout>
        );
    }
}

export default index;