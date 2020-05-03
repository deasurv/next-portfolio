const express = require('express');
const router = express.Router();
const authService = require('./../services/auth');

const blogController = require('./../controllers/blog');

router.get('', blogController.getPublishedBlogs);

router.get('/me', authService.checkJWT, authService.checkRole('siteOwner'), blogController.getUserBlogs);

router.get('/:id', blogController.getBlogByID);

router.get('/s/:slug', blogController.getBlogBySlug);

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), blogController.createBlog);

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), blogController.updateBlog);

router.delete('/:id', authService.checkJWT, authService.checkRole('siteOwner'), blogController.deleteBlog);

module.exports = router;