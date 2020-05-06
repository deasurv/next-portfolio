const jwt = require('express-jwt');
const jwksRSA = require('jwks-rsa');

const config = require('./../config');
const { NAMESPACE } = config;

exports.checkJWT = jwt({
    secret: jwksRSA.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 50,
        jwksUri: 'https://deasurv.auth0.com/.well-known/jwks.json'
    }),
    audience: 'pjMBkDAMj5vLW4iFexJLfRSfJbRGgI44',
    issuer: 'https://deasurv.auth0.com/',
    algorithms: ['RS256']
});

exports.checkRole = role =>
    (req, res, next) => {
        const user = req.user;

        if(user && user[`${NAMESPACE}/roles`] && (user[`${NAMESPACE}/roles`] === role)){
            next();
        } else {
            return res.status(401).send({
                status: 401,
                details: 'Not authorized'
            });
        }
    };