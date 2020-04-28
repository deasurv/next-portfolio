const Blog = require('./../models/blog');

const AsyncLock = require('async-lock');
const lock = new AsyncLock();

exports.getUserBlogs = (req, res) => {
    const userID = req.user.sub;

    Blog.find({userID}, (error, userBlogs) => {
        if(error){
            return res.status(422).send(error);
        }

        return res.json(userBlogs);
    });
};

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
    const { lockID } = req.query;

    if(!lock.isBusy(lockID)){
        lock.acquire(lockID, done => {
            const blogData = req.body;
            const blog = new Blog(blogData);
    
            if(req.user){
                const { user } = req;
                blog.userID = user.sub;
                blog.author = user.name;
            }
        
            blog.save((error, createdBlog) => {
                setTimeout(() => done(), 5000);
    
                if(error){
                    return res.status(422).send(error);
                }
                return res.json(createdBlog);
            });
        }, (err, ret) => {
            err && console.error(err);
        });
    } else {
        return res.status(422).send({
            status: 422,
            message: 'Blog is saving'
        });
    }
};
 
exports.updateBlog = (req, res) =>{
    const blogID = req.params.id;
    const blogData = req.body;

    Blog.findById(blogID, (error, foundBlog) => {
        if(error){
            return res.status(422).send(error);
        }

        foundBlog.set(blogData);
        foundBlog.updatedAt = new Date();
        foundBlog.save((error, savedBlog) => {
            if(error){
                return res.status(422).send(error);
            }
            return res.json(savedBlog);
        })
    });
};

/*
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