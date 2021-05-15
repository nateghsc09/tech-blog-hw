const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts });
  } catch (error) {
    console.log('ERROR HERE: ', error);
    res.status(500).json(error);
  }
});

router.get('/post/:id', async (req, res) => {});

router.get('/login', async (req, res) => {});

// router.get('/logout', async (req, res) => {

// });

router.get('/signup', async (req, res) => {});

module.exports = router;
