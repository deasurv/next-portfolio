import React, { Component } from 'react';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

class cv extends Component{
    render(){
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>CV page</h1>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default cv;