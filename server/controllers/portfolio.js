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
    const portfolio = new Portfolio(portfolioData);

    portfolio.save((error, createdPortfolio) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(createdPortfolio);
    });
};