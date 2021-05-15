const { Comment } = require('../models');

const commentData = [
    {
        body: "Do the comments work?",
        user_id: 2,
        article_id: 1
    },
    {
        body: "Great info!",
        user_id: 1,
        article_id: 2
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;