import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import withAuth from './../components/hoc/withAuth';

import SlateEditor from './../components/slate-editor/SlateEditor';

import { createBlog } from './../actions';

class BlogEditor extends Component{


    constructor(props) {
        super(props);

        this.state = {
            isSaving: false
        };
    }
    
    createBlog = (heading, story) => {
        const blog = {};
        //blog.title = heading.title;
        //blog.subtitle = heading.subtitle;
        blog.story = story;

        this.setState({
            isSaving: true
        });

        createBlog(blog).then(data => {
            this.setState({ isSaving: false });
        }).catch(err => {
            this.setState({ isSaving: false });
            const message = err.message || 'Server Error!';
            console.error(message);
        });
    }

    render(){
        const { isSaving } = this.state;

        return(
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page" title="Write your story...">
                    <SlateEditor isSaving={isSaving} save={this.createBlog} />
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(BlogEditor);