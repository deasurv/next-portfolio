const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://deasurv.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://deasurv.herokuapp.com',
    'process.env.CLIENT_ID': 'pjMBkDAMj5vLW4iFexJLfRSfJbRGgI44'
}