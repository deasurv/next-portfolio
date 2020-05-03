import axios from 'axios';

import Cookies from 'js-cookie';
import { getCookieFromRequest } from './../helpers/utils';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 5000
});

const setAuthHeader = (req) => {
    const token = req ? getCookieFromRequest(req, 'jwt') : Cookies.getJSON('jwt');
    return token ? {headers:{authorization: `Bearer ${token}`}} : undefined;
};

export const getSecretData = async (req) => {
    return await axiosInstance.get('/secret', setAuthHeader(req))
        .then(res => res.data);
}

const rejectPromise = (responseError) => {
    let error = {};

    if(responseError && responseError.response && responseError.response.data){
        error = responseError.response.data;
    } else {
        error = responseError;
    }

    return Promise.reject(error);
};

export const getPortfolios = async () => {
    return await axiosInstance.get('/portfolios')
        .then(res => res.data);
};

export const getPortfolioByID = async (id) => {
    return await axiosInstance.get(`/portfolios/${id}`)
        .then(res => res.data);
};

export const createPortfolio = async (portfolioData) => {
    return await axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
        .then(res => res.data)
        .catch(error => rejectPromise(error))
};

export const updatePortfolio = async (portfolioData) => {
    return await axiosInstance.patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
        .then(res => res.data)
        .catch(error => rejectPromise(error))
};

export const deletePortfolio = async (portfolioID) => {
    return await axiosInstance.delete(`/portfolios/${portfolioID}`, setAuthHeader())
        .then(res => res.data);
};

export const getUserBlogs = async (req) => {
    return await axiosInstance.get('/blogs/me', setAuthHeader(req))
        .then(res => res.data);
};

export const createBlog = async (blogData, lockID) => {
    return axiosInstance.post(`/blogs?lockID=${lockID}`, blogData, setAuthHeader())
        .then(response => response.data)
        .catch(err => rejectPromise(err));
};

export const updateBlog = async (blogData) => {
    return axiosInstance.patch(`/blogs/${blogData._id}`, blogData, setAuthHeader())
        .then(response => response.data)
        .catch(err => rejectPromise(err));
};

export const getBlogByID = async (id) => {
    return await axiosInstance.get(`/blogs/${id}`)
        .then(res => res.data);
};

export const deleteBlog = async (blogID) => {
    return await axiosInstance.delete(`/blogs/${blogID}`, setAuthHeader())
        .then(res => res.data)
        .catch(err => rejectPromise(err));
};

export const getPublishedBlogs = async (req) => {
    return await axiosInstance.get('/blogs').then(res => res.data);
};

export const getBlogBySlug = async (slug) => {
    return await axiosInstance.get(`/blogs/s/${slug}`)
        .then(res => res.data);
};