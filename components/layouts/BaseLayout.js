import React, { Fragment } from 'react';
import Header from './../shared/Header';

import Head from 'next/head';

const BaseLayout = (props) => {
    const { children, className, isAuthenticated, user } = props;
    const headerType = props.headerType || 'default';
    
    return(
        <Fragment>
            <Head>
                <title>Majid Fatahi</title>

                <link href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" rel="stylesheet" crossorigin="anonymous" />
                <script src="https://kit.fontawesome.com/5cc96674f7.js" crossorigin="anonymous"></script>
            </Head>
            <div className="layout-container" >
                <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} user={user} />
                <main className={`cover ${className}`}>
                    <div className="wrapper">
                        {children}
                    </div>
                </main>
            </div>
        </Fragment>
    );
}

export default BaseLayout;