const Post = require('../model/Post');
const { validationResult } = require('express-validator');
const fs = require('fs');

// create post
exports.createPost = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const { title, content, category } = req.body;
        const newPost = new Post({
            title,
            content,
            category,
            image: req.file.path,
            createdBy: req.user._id
        })

        const post = await newPost.save();
        res.json(post)

    } catch (err) {
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
                                .populate("createdBy", "-password")
                                .sort({createdAt: -1})
        if(posts.length == 0){
            return res.status(404).json({msg: 'Posts not found'})
        }
        
        res.json(posts)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get a post
exports.getPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId)
                                .populate("createdBy", "-password")
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json(post)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// update post
exports.putPost = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        return res.status(422).json({errors: errors.array() });
    }

    try {
        const postId = req.params.postId;

        let updateTitle = req.body.title;
        let updateContent = req.body.content;
        let updateCategory = req.body.category;

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }

        post.title = updateTitle;
        post.content = updateContent;        
        post.category = updateCategory;
        if(req.file){
            fs.unlink(post.image, err => {
                console.log(err)
            })
            let updateImage = req.file.path;
            post.image = updateImage;
        }
        // console.log(post)
        const updatedPost = await post.save()
        res.json(updatedPost)
    } catch (err) {
        if(req.file){
            fs.unlink(req.file.path, err => {
                console.log(err)
            })
        }
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// delete post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletePost = await Post.findById(postId);
        // console.log(deletePost)
        if(!deletePost){
            return res.status(404).json({msg: 'Post not found'})
        }
        if(req.user._id.toString() !== deletePost.createdBy._id.toString()){
            return res.status(401).json({msg: 'No authorized to delete'})
        }
        fs.unlink(deletePost.image, err => {
            console.log(err)
        })
        await deletePost.remove();
        res.json(deletePost)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// create a comment
exports.postComment = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const post = await Post.findById(req.params.postId)
        // console.log(req.user)
        if(!post){
            return res.status(404).json({error: 'post doesn\'t exists'})
        }
        const { text } = req.body;
        const newComment = {
            text,
            name: req.user.name,
            postedBy: req.user._id
        }

        post.comments.unshift(newComment)
        const result = await post.save();
        res.json(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// delete comment
exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        const comment = post.comments.find(comment => comment._id.toString() === req.params.commentId.toString());
        
        // comment exists or not
        if(!comment){
            return res.status(404).json({error: 'Comment doesn\'t exists'})
        }
        
        // comment is of logged in user or not
        if(comment.postedBy.toString() !== req.user._id.toString()){
            return res.status(404).json({error: 'user is not authorized'})
        }

        // get comment Index
        const commentIndex = post.comments.map(comment => comment._id).indexOf(req.params.commentId)
        post.comments.splice(commentIndex, 1)
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// post like
exports.postLike = async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId);

        if(!post){
            return res.status(404).json({error: 'post doesn\'t exists'})
        }

        // check if the post already been liked
        // post.likes.map(like => {
        //     if(like.toString() == req.user._id.toString()){
        //         return res.status(404).json({msg: 'post is already liked'})
        //     }
        // })

        if(post.likes.filter(like => like.toString() === req.user._id.toString()).length > 0){
            const likeIndex = post.likes.map(like => {
                if(like.toString() === req.user._id.toString()){
                    post.likes.shift(like);
                    post.save();
                }
            });
            return res.json({post:post, msg: 'Post unliked'});
        }

        post.likes.unshift(req.user._id)
        await post.save();
        res.json({post:post, msg: 'post like'})

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get posts by category
exports.getPostByCategory = async (req, res) => {
    const categoryName = req.query.category;
    try {
        const posts = await Post.find({category: categoryName})
                                .populate("createdBy", "-password")
                                .sort({createdAt: -1})
        if(posts.length == 0){
            return res.status(404).json({msg: 'Posts not found'})
        }
        
        res.json(posts)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}