const Portfolio = require('./../models/portfolio');

exports.getPortfolios = (req, res) => {
    Portfolio.find({}, (error, allPortfolios) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(allPortfolios);
    });
};

exports.getPortfolioByID = (req, res) => {
    const portfolioID = req.params.id;

    Portfolio.findById(portfolioID, (error, foundPortfolio) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(foundPortfolio);
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

exports.updatePortfolio = (req, res) =>{
    const portfolioID = req.params.id;
    const portfolioData = req.body;

    Portfolio.findById(portfolioID, (error, foundPortfolio) => {
        if(error){
            return res.status(422).send(error);
        }

        foundPortfolio.set(portfolioData);
        foundPortfolio.save((error, savedPortfolio) => {
            if(error){
                return res.status(422).send(error);
            }
            return res.json(savedPortfolio);
        })
    });
};

exports.deletePortfolio = (req, res) => {
    const portfolioID = req.params.id;

    Portfolio.deleteOne({_id: portfolioID}, (error, deletedPortfolio) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json({
            status: 1,
            details: 'portfolio deleted!'
        }); 
    });
};