import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import { Container, Row, Col } from 'reactstrap';

import { Link } from './../routes';

import { getPublishedBlogs } from './../actions';

import moment from 'moment';

import { shortenText } from './../helpers/utils';

class Blogs extends Component{

    static async getInitialProps({ req }){
        let blogs = [];

        try{
            blogs = await getPublishedBlogs(req);
        } catch(err){
            console.error(err);
        }

        return { blogs };
    }

    renderBlog(blog, index){
        return(
            <div key={index} className="post-preview">
                <Link route={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="post-title">{blog.title}</h2>
                        <h3 className="post-subtitle">{shortenText(blog.subtitle)}</h3>
                    </a>
                </Link>
                <p className="post-meta">Posted by<a href="#"> {blog.author} </a>{moment(blog.createdAt).format('LLLL')}</p>
            </div>
        );
    }

    renderBlogs(blogs){
        return blogs.map((blog, index) => this.renderBlog(blog, index));
    }

    render(){
        const { blogs } = this.props;

        return (
            <BaseLayout {...this.props.auth} headerType={'landing'} className="blog-listing-page" title="Majid Fatahi - Read my stories">
                <div className="masthead" style={{ "backgroundImage": "url('/static/images/home-bg.jpg')" }}>
                    <div className="overlay"></div>
                    <Container>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Fresh Blogs</h1>
                                    <span className="subheading">Programming, travelling...</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <BasePage className="blog-body">
                    <Row>
                        <Col md="10" lg="8" className="mx-auto">
                            {
                                this.renderBlogs(blogs)
                            }
                        </Col>
                    </Row>

                    <footer>
                        <Container>
                            <Row>
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <ul className="list-inline text-center">
                                        <li className="list-inline-item">
                                            <a href="https://twitter.com/deasurv" target="_blank">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="https://github.com/deasurv" target="_blank">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="copyright text-muted">Copyright &copy; Majid Fatahi 2020</p>
                                </div>
                            </Row>
                        </Container>
                    </footer>
                </BasePage>
                <style jsx>{`
                    @import url('https://use.fontawesome.com/releases/v5.13.0/css/all.css');
                `}
                </style>
            </BaseLayout>
        );
    }
}

export default Blogs;