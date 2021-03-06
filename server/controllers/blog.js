const Blog = require('./../models/blog');

const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const slugify = require('slugify');

exports.getPublishedBlogs = (req, res) => {

    Blog.find({status: 'published'})
        .sort({'createdAt': -1})
        .exec((err, publishedBlogs) => {
            if(err){
                return res.status(422).send(err);
            }

            return res.json(publishedBlogs);
    });
};

exports.getBlogBySlug = (req, res) => {
    const slug = req.params.slug;

    Blog.findOne({slug}, (error, foundBlog) => {
        if(error){
            return res.status(422).send(error);
        }

        return res.json(foundBlog);
    });
};

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

        if(blogData.status && blogData.status === 'published' && !foundBlog.slug){
            foundBlog.slug = slugify(foundBlog.title, {
                replacement: '-',
                remove: null,
                lower: true,
            });
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

exports.deleteBlog = (req, res) => {
    const blogID = req.params.id;

    Blog.deleteOne({_id: blogID}, (error, deletedBlog) => {
        if(error){
            return res.status(422).send(error);
        }

        return res.json({
            status: 1,
            details: 'blog deleted!'
        }); 
    });
};