const express = require('express');
const router = express.Router();
const { jwtAuth, genAuth } = require('../jwt');
const Like = require('../databases/like');
const Post = require('../databases/post');
const User = require('../databases/user');

router.get('/like/:post_id', jwtAuth, async (req, res) => {

    try {
        const userId = req.user.id
        const userData = await User.findById(userId)
        const post_id = req.params.post_id
        const PostData = await Post.findById(post_id)

        // post is avilable or not
        if (!PostData) {
            return res.status(500).json({ message: 'Post is no longer avilable' })
        }
        // user is avilable or not
        if (!userData) {
            return res.status(500).json({ message: 'User is not found' })
        }
        // Adding data in like table
        const LikeData = new Like({
            user_id: userId,
            post_id: post_id
        });
        const response = await LikeData.save();
        // adding like into Post table
        PostData.post.push(userId);
        await PostData.save();
        return res.status(200).json({response:response,PostData});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred while liking the post.' });
    }

})
module.exports=router




