const express = require('express');
const router = express.Router();
const authService = require('./../services/auth');

const portfolioController = require('./../controllers/portfolio');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioController.savePortfolio);

router.get('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioController.getPortfolios);

module.exports = router;