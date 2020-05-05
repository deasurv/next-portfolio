import React, { Fragment } from 'react';
import Header from './../shared/Header';

import Head from 'next/head';

const BaseLayout = (props) => {
    const { children, className, isAuthenticated, user, isSiteOwner, title } = props;
    const headerType = props.headerType || 'default';
    
    return(
        <Fragment>
            <Head>
                <title>{title || 'Majid Fatahi - Portfolio'}</title>
                <meta name="description" content="My name is Majid Fatahi and I am an experienced software engineer and freelance developer. I have a Master's degree in Artificial Intelligence and several years of experience working on a wide range of technologies and projects from C++ development for ultrasound devices to modern mobile and web applications in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to take my course, where I have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and understandable way." />
                <meta name="keywords" content="majid fatahi portfolio, front-end developer, react developer, freelancig, programming, web developer"/>
                <meta property="og:title" content="Majid Fatahi - programmer, developer, bloger" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:url" content={`${process.env.BASE_URL}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="My name is Majid Fatahi and I am an experienced software engineer and freelance developer."/>
                <link href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" rel="stylesheet" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
                <link rel="manifest" href="/static/site.webmanifest" />
            </Head>
            <div className="layout-container" >
                <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} isSiteOwner={isSiteOwner} user={user} />
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