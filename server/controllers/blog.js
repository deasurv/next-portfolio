const Blog = require('./../models/blog');
/* 
exports.getPortfolios = (req, res) => {

    Portfolio.find({})
        .sort({'startDate': 1})
        .exec((error, allPortfolios) => {
            if(error){
                return res.status(422).send(error);
            }
            return res.json(allPortfolios);
        });
};

*/

exports.getBlogByID = (req, res) => {
    const blogID = req.params.id;

    Blog.findById(blogID)
        .select('-__v')
        .exec((error, foundBlog) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(foundBlog);
    });
};

exports.createBlog = (req, res) => {
    const blogData = req.body;
    const blog = new Blog(blogData);
    if(req.user){
        const { user } = req;
        blog.userID = user.sub;
        blog.author = user.name;
    }

    blog.save((error, createdBlog) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(createdBlog);
    });
};

/* 
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
 */