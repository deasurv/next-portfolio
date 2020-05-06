import React, { Component } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';


class Portfolio extends Component{

    static async getInitialProps({ query }){
        const postID = query.id;
        let post = {};

        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postID}`);
            post = response.data;
        } catch(error){
            console.error(error);
        }

        return {
            post: post
        };
    }

    render(){
        const { post } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Portfolio page</h1>
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <div>
                            <span>id: {post.id}</span>
                            <span>userID: {post.userId}</span>
                        </div>
                    </div>
                    <h2>{/* this.props.router.query.id */}</h2>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withRouter(Portfolio);