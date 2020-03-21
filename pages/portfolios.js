import React, { Component } from 'react';
import { Link } from './../routes';
import axios from 'axios';

import BaseLayout from './../components/layouts/BaseLayout';

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
            <li key={index}>
                <Link route={`/portfolio?id=${post.id}`}>
                    <a>{post.title}</a>
                </Link>
            </li>
        );
    }

    renderPosts(posts){
        return posts.map((post, index) => this.renderPost(post, index));
    }

    render(){
        const { posts } = this.props;
        return(
            <BaseLayout>
                <h1>Portfolios page</h1>
                <ul>{ this.renderPosts(posts) }</ul>
            </BaseLayout>
        );
    }
}

export default portfolios;