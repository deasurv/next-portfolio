const routes = require('next-routes');

module.exports = routes()
    .add('portfolio', '/portfolio/:id')
    .add('portfolio-edit', '/portfolios/:id/edit')
    .add('blog-edit', '/blogs/:id/edit')
