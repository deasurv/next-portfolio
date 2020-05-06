import React from 'react';

import BaseLayout from './../layouts/BaseLayout';
import BasePage from './../BasePage';

export default role => Component =>
    class withAuth extends React.Component{

        static async getInitialProps(args){
            const pageProps = Component.getInitialProps && await Component.getInitialProps(args);

            return {...pageProps};
        }

        renderProtectedPage(){
            const { isAuthenticated, user } = this.props.auth;
            const userRole = user && user[`${process.env.NAMESPACE}/roles`];

            let isAuthorized = false;

            if(role){
                if(userRole && userRole === role) isAuthorized = true;
            } else {
                isAuthorized = true;
            }

            if(!isAuthenticated){
                return(
                    <BaseLayout {...this.props.auth}>
                        <BasePage>
                            <h1>You are not authenticated</h1>
                            <p>Please login to access this page.</p>
                        </BasePage>
                    </BaseLayout>
                );
            } else if (!isAuthorized){
                return(
                    <BaseLayout {...this.props.auth}>
                        <BasePage>
                            <h1>You are not authorized</h1>
                            <p>You don't have permission to visit this page!</p>
                        </BasePage>
                    </BaseLayout>
                );
            } else {
                return (<Component {...this.props} />);
            }
        }

        render(){
            return this.renderProtectedPage();
        }
    }
