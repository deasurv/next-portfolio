import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import withAuth from './../components/hoc/withAuth';

import SlateEditor from './../components/slate-editor/SlateEditor';

import { toast } from 'react-toastify';

import { getBlogByID, updateBlog } from './../actions';

class BlogEditor extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isSaving: false
        };
    }
    
    static async getInitialProps({ query }){
        const blogID = query.id;
        let blog = {};

        try{
            blog = await getBlogByID(blogID);
        } catch(err){
            console.error(err);
        }

        return { blog };
    }

    updateBlog = (heading, story) => {
        const { blog } = this.props;

        blog.title = heading.title;
        blog.subtitle = heading.subtitle;
        blog.story = story;

        this.setState({
            isSaving: true
        });

        updateBlog(blog)
            .then(updatedBlog => {
                toast.success('Blog saved successfully!');
                this.setState({ isSaving: false });
            }).catch(err => {
                this.setState({ isSaving: false });
                const message = err.message || 'Server Error!';
                toast.error(message);
                console.error(message);
            });
    }

    render(){
        const { blog } = this.props;
        const { isSaving } = this.state;

        return(
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page" title="Write your story...">
                    <SlateEditor initialValue={blog.story} isSaving={isSaving} save={this.updateBlog} />
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(BlogEditor);