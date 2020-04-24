const express = require('express');
const router = express.Router();
const authService = require('./../services/auth');

const blogController = require('./../controllers/blog');

router.get('/:id', blogController.getBlogByID);

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), blogController.createBlog);

module.exports = router;