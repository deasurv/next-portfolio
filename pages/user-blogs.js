import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import { Button } from 'reactstrap';

import withAuth from './../components/hoc/withAuth';
import { Router, Link } from './../routes';

import { getUserBlogs, updateBlog, deleteBlog } from './../actions';

import { Container, Row, Col } from 'reactstrap';
import PortfolioButtonDropdown from './../components/PortfolioButtonDropdown';

class UserBlogs extends Component{

    static async getInitialProps({ req }){
        let blogs = [];

        try{
            blogs = await getUserBlogs(req);
        } catch(err){
            console.error(err);
        }

        return { blogs };
    }

    changeBlogStatus(blog, status){
        blog.status = status;
        updateBlog(blog)
            .then(() => {
                Router.pushRoute('/user-blogs');
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    deleteBlogWarning(blogID){
        const result = confirm('Are you sure you want to delete this blog post?');
        if(result) this.deleteBlog(blogID);
    }

    deleteBlog(blogID){
        deleteBlog(blogID)
            .then(() => {
                Router.pushRoute('/user-blogs');
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    separateBlogs(blogs){
        const published = [];
        const drafts = [];

        blogs.forEach(blog => {
            blog.status === 'draft' ? drafts.push(blog) : published.push(blog);
        });

        return { published, drafts};
    }

    createStatus(status){
        return status === 'draft' ? {view: 'Publish', value: 'published'} : {view: 'Make a draft', value: 'draft'};
    }

    dropdownOptions(blog){
        const status = this.createStatus(blog.status);

        return [
            { text: status.view, handlers: { onClick: () => this.changeBlogStatus(blog, status.value) } },
            { text: 'Delete', handlers: { onClick: () => this.deleteBlogWarning(blog._id) } }
        ];
    }

    renderBlog(blog, index){
        return (
            <li key={index}>
                <Link route={`/blogs/${blog._id}/edit`}>
                    <a>{blog.title}</a>
                </Link>
                <PortfolioButtonDropdown items={this.dropdownOptions(blog)} />
            </li>
        );
    }

    renderBlogs(blogs){
        return (
            <ul className="user-blog-list">
                { blogs.map((blog, index) => this.renderBlog(blog, index)) }
            </ul>
        )
    }

    render(){
        const { blogs } = this.props;
        const { published, drafts } = this.separateBlogs(blogs);
        return(
            <BaseLayout {...this.props.auth} headerType={'landing'} className="blog-user-page">
                <div className="masthead" style={{ "backgroundImage": "url('/static/images/home-bg.jpg')" }}>
                    <div className="overlay"></div>
                    <Container>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Blog Dashboard</h1>
                                    <span className="subheading">Let's <Link route='/blogs/new'><Button color="primary">Create new story</Button></Link></span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <BasePage className="blog-body">
                    <Row>
                        <Col md="6" className="mx-auto text-center">
                            <h3 className="blog-status-title">Published Blogs</h3>
                            { this.renderBlogs(published) }
                        </Col>
                        <Col md="6" className="mx-auto text-center">
                            <h3 className="blog-status-title">Draft Blogs</h3>
                            { this.renderBlogs(drafts) }
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(UserBlogs);