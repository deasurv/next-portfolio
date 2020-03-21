import React, { Component, Fragment } from 'react';
import Link from 'next/link';

import './../styles/main.scss';

class Header extends Component{
    render(){
        //debugger;
        //const title = this.props.title;

        return(
            <Fragment>
                <p className={'customClass'}>My Fuckin Project</p>
                <p className={'customClassFromFile'}>something weird...</p>
                <Link href="/"><a>Home</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/blogs"><a>Blogs</a></Link>
                <Link href="/portfolios"><a>Portfolios</a></Link>
                <Link href="/cv"><a>CV</a></Link>
                <style jsx>{`
                    a{
                        font-size: 1.2rem;
                    }
                    .customClass{
                        font-family: Impact;
                        font-size: 2rem;
                    }
                `}</style>
            </Fragment>
        );
    }
}

export default Header;