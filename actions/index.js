import axios from 'axios';

import Cookies from 'js-cookie';
import { getCookieFromRequest } from './../helpers/util';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 5000
});

const setAuthHeader = (req) => {
    const token = req ? getCookieFromRequest(req, 'jwt') : Cookies.getJSON('jwt');
    return token ? {headers:{authorization: `Bearer ${token}`}} : undefined;
};

export const getSecretData = async (req) => {
    return await axiosInstance.get('/secret', setAuthHeader(req)).then(res => res.data);
}

const rejectPromise = (responseError) => {
    let error = {};

    if(responseError && responseError.response && responseError.response.data){
        error = responseError.response.data;
    } else {
        error = responseError;
    }

    return Promise.reject(error);
}

/* export const getSecretDataServer = async (req) => {
    return await axios.get('http://localhost:3000/api/v1/secret', setAuthHeader(req)).then(res => res.data);
} */

export const getPortfolios = async () => {
    return await axiosInstance.get('/portfolios').then(res => res.data);
}

export const createPortfolio = async (portfolioData) => {
    return await axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
    .then(res => res.data)
    .catch(error => rejectPromise(error))
}