const express = require('express');
const next = require('next');
const compression = require('compression');

const path = require('path');

const mongoose = require('mongoose');
const routes = require('./../routes');
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const bodyParser = require('body-parser');
const config = require('./config');

const bookRoutes = require('./routes/book');
const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog');

const secretData = [
    { title: 'secret1', description: 'secret1 desc' },
    { title: 'secret2', description: 'secret2 desc' },
];

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
        .then(() => console.log('Database connected!'))
        .catch(error => console.error(error));

const robotsOptions = {
    root: path.join(__dirname, '../static'),
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
};

app.prepare()
.then(() => {
    const server = express();
    server.use(compression());
    server.use(bodyParser.json());

    server.use('/api/v1/books', bookRoutes);
    server.use('/api/v1/portfolios', portfolioRoutes);
    server.use('/api/v1/blogs', blogRoutes);

    server.get('/robots.txt', (req, res) => {
        return res.status(200).sendFile('robots.txt', robotsOptions);
    });

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
        return res.json(secretData);
    });

    server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
        return res.json(secretData);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({
                status: 401,
                details: 'Unauthorized access!'
            });
        }
    });

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
        if(err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});