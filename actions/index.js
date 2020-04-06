import axios from 'axios';

import Cookies from 'js-cookie';
import { getCookieFromRequest } from './../helpers/util';

const setAuthHeader = (req) => {
    const token = req ? getCookieFromRequest(req, 'jwt') : Cookies.getJSON('jwt');
    return token ? {headers:{authorization: `Bearer ${token}`}} : undefined;
};

export const getSecretData = async (req) => {
    const url = req ? 'http://localhost:3000/api/v1/secret' : '/api/v1/secret';
    return await axios.get(url, setAuthHeader(req)).then(res => res.data);
}

/* export const getSecretDataServer = async (req) => {
    return await axios.get('http://localhost:3000/api/v1/secret', setAuthHeader(req)).then(res => res.data);
} */