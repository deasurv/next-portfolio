import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import withAuth from './../components/hoc/withAuth';

import SlateEditor from './../components/slate-editor/SlateEditor';

import { getBlogByID } from './../actions';

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

    render(){
        const { blog } = this.props;
        const { isSaving } = this.state;

        return(
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page" title="Write your story...">
                    <SlateEditor initialValue={blog.story} isSaving={isSaving} save={ () => console.log('should be update') } />
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(BlogEditor);