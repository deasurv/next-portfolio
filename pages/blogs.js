import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

class blogs extends Component{
    render(){
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Blogs page</h1>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default blogs;