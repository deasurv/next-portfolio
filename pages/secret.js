import React, { Component } from 'react';

import { getSecretData } from './../actions';

import BaseLayout from './../components/layouts/BaseLayout';
import BasePage from './../components/BasePage';

import withAuth from './../components/hoc/withAuth';

class Secret extends Component{

    state = {
        secretData: []
    };

    static async getInitialProps({ req }){
        const someVar = 'some value';
        const anotherSecretData = await getSecretData(req)

        return { someVar };
    }

    async componentWillMount(){
        const secretData = await getSecretData();

        this.setState({
            secretData
        }); 
    }

    displaySecretData(){
        const  { secretData } = this.state;
        if(secretData.length){
            return secretData.map((data, index) => {
                return(
                    <div key={index}>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                );
            });
        }
    }

    render(){
        const { someVar } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Secret page</h1>
                    <p>Secret Content</p>
                    <p>{ someVar }</p>
                    { this.displaySecretData() }
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth()(Secret);