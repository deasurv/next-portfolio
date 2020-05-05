const routes = require('next-routes');

module.exports = routes()
    .add('portfolio', '/portfolio/:id')
    .add('portfolio-edit', '/portfolios/:id/edit')
    .add('user-blogs', '/blogs/dashboard')
    .add('blog-new', '/blogs/new')
    .add('blog-details', '/blogs/:slug')
    .add('blog-edit', '/blogs/:id/edit')
