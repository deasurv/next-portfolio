import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromRequest } from './../helpers/utils';

const { CLIENT_ID } = process.env;

class Auth0{

    constructor(){
        this.auth0 = new auth0.WebAuth({
            domain: 'deasurv.auth0.com',
            clientID: CLIENT_ID,
            redirectUri: `${process.env.BASE_URL}/callback`,
            responseType: 'token id_token',
            scope: 'openid profile'
        });

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    handleAuthentication(){
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((error, result) => {
                if(result && result.accessToken && result.idToken){
                    this.setSession(result);
                    resolve();
                } else if(error){
                    reject(error);
                    console.error(error);
                }
            });
        });
    }

    setSession(result){
        const expiresAt = JSON.stringify((result.expiresIn * 1000) + new Date().getTime());
        Cookies.set('jwt', result.idToken);
    }

    login(){
        this.auth0.authorize();
    }

    logout(){
        Cookies.remove('jwt');

        this.auth0.logout({
            returnTo: process.env.BASE_URL,
            clientID: CLIENT_ID
        })
    }

    async getJWKS(){
        const response = await axios.get('https://deasurv.auth0.com/.well-known/jwks.json')
        const jwks = response.data;
        return jwks;
    }

    async verifyToken(token){
        if(token){
            const decodedToken = jwt.decode(token, { complete: true });
            
            if(!decodedToken) return false;

            const jwks = await this.getJWKS();
            const jwk = jwks.keys[0];

            let certificate = jwk.x5c[0];
            certificate = certificate.match(/.{1,64}/g).join('\n');
            certificate = `-----BEGIN CERTIFICATE-----\n${certificate}\n-----END CERTIFICATE-----\n`;

            if(jwk.kid === decodedToken.header.kid){
                try{
                    const verifiedToken = jwt.verify(token, certificate);
                    const expiresAt = verifiedToken.exp * 1000;

                    return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
                }catch(error){
                    return undefined;
                }
            }
        }
        return undefined;
    }

    async clientAuth(){
        const token = Cookies.get('jwt');
        return await this.verifyToken(token);
    }

    async serverAuth(req){
        if(req.headers.cookie){
            const token = getCookieFromRequest(req, 'jwt');
            return await this.verifyToken(token);
        }
        return undefined;
    }
}

const auth0Client = new Auth0();

export default auth0Client;