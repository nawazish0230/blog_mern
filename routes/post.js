const router = require('express').Router();
const postController = require('../controller/post');
const { check } = require('express-validator');
const isLoggedIn = require('../middleware/isLoggedIn');
const fileUpload = require('../middleware/file-upload');

// create posts
router.post('/create',fileUpload.single('image'), isLoggedIn, [
    check('title', 'Enter title field').not().isEmpty(),
    check('content', 'Enter content field').not().isEmpty(),
    check('category', 'Enter category field').not().isEmpty(),
] ,postController.createPost)

// get all posts
router.get('/get-all', postController.getAllPosts);

// get a post
router.get('/post/:postId', postController.getPost)

// update a post
router.put('/edit-post/:postId',fileUpload.single('image'), isLoggedIn,[
    check('title', 'Enter title field').not().isEmpty(),
    check('content', 'Enter content field').not().isEmpty(),
], postController.putPost)

// delete a post
router.delete('/delete-post/:postId', isLoggedIn, postController.deletePost)

// post a comment
router.post('/comment/:postId',
            isLoggedIn, 
            [check('text', 'Enter comment field').not().isEmpty()],
            postController.postComment)

// delete comment
router.delete('/delete-comment/:postId/:commentId', isLoggedIn, postController.deleteComment)

// post a like
router.post('/like/:postId', isLoggedIn, postController.postLike)

// get a post
router.get('/post-by-category', postController.getPostByCategory)

module.exports = router;