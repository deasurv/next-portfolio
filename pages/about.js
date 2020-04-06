import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

class about extends Component{
    render(){
        return(
            <BaseLayout {...this.props.auth}>
                <BasePage className="about-page" title="About Page">
                </BasePage>
            </BaseLayout>
        );
    }
}

export default about;