const mongoose = require('mongoose');
const slug = require('slug')

const PostSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        // required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    post: [
        {
            like_id: {
                type: mongoose.Schema.Types.ObjectId,
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    comment: [
        {
            comment_id:{
                type: mongoose.Schema.Types.ObjectId,
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ],
});

// Pre-save middleware to generate slug from title
PostSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = slug(this.title);
    }
    next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
