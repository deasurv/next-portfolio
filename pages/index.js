import React, { Component, Fragment } from 'react';
import axios from 'axios';

import BaseLayout from './../components/layouts/BaseLayout';

/* const funcIndex = () => (
    <div>
        <p>Hello World!</p>
    </div>
); */

class index extends Component{

    static async getInitialProps(){
        /* console.log('Hello from getInitialProps!'); */

        /* axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => console.log(response.data))
            .catch(error => console.log(error)); */
        let posts;
        try{
            const response  = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = response.data;

        } catch (error){
            console.log(error);
        }

        return {
            posts: posts,
            myData: [1,2,3]
        };
    }

    constructor(){
        super();
        /* console.log('constructor'); */

        this.state = {
            link: {
                title: 'Go to Google!',
                href: 'https://www.google.com'
            }
        }
    }

    componentWillMount(){
        /* console.log(this);
        console.log('componentWillMount'); */
    }

    componentDidMount(){
        /* console.log('componentDidMount'); */
    }

    componentWillUpdate(){
        /* console.log('componentWillUpdate'); */
    }

    componentDidUpdate(){
        /* console.log('componentDidUpdate'); */
    }

    componentWillUnmount(){
        /* console.log('componentWillUnmount'); */
    }

    updateLink = () => {
        /* console.log(this); */
        this.setState({
            link: {
                title: 'Go to Paziresh24',
                href: 'https://www.paziresh24.com'
            }
        });
    }

    render(){
        const {myData, posts} = this.props;
        /* console.log(myData);
        console.log('render');
        console.log(posts); */
        return(
            <BaseLayout>
                { /* posts.map(post => <h3>{post.title}</h3>) */ }
                <h1>Home page</h1>
                <a href={this.state.link.href} target={'_blank'}>{this.state.link.title}</a>
                <button type={'button'} onClick={this.updateLink}>Change Link</button>
            </BaseLayout>
            //React.createElement('div', null, React.createElement('p', null, 'Hello Wolrd!'))
        );
    }
}

export default index;