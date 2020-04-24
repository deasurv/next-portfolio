import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import withAuth from './../components/hoc/withAuth';

import SlateEditor from './../components/slate-editor/SlateEditor';

import { saveBlog } from './../actions';

class BlogEditor extends Component{


    constructor(props) {
        super(props);

        this.state = {
            isSaving: false
        };
    }
    
    saveBlog = (heading) => {
        const blog = {};
        blog.title = heading.title;
        blog.subtitle = heading.subtitle;

        this.setState({
            isSaving: true
        });

        saveBlog().then(data => {
            this.setState({
                isSaving: false
            });
            console.log(data);
        });
        console.log('SaveBlog');
        console.log(blog);
    }

    render(){
        const { isSaving } = this.state;

        return(
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page" title="Write your story...">
                    <SlateEditor isSaving={isSaving} save={this.saveBlog} />
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(BlogEditor);