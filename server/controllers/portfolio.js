const Portfolio = require('./../models/portfolio');

exports.getPortfolios = (req, res) => {
    Portfolio.find({}, (error, allPortfolios) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(allPortfolios);
    });
};

exports.savePortfolio = (req, res) => {
    const portfolioData = req.body;
    const userID = req.user && req.user.sub;
    const portfolio = new Portfolio(portfolioData);
    portfolio.userID = userID;

    portfolio.save((error, createdPortfolio) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(createdPortfolio);
    });
};