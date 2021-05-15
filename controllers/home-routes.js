const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
      const dbArticleData = await Article.findAll({
          include: [
              {
                  model: User,
                  attributes: ['username']
              },
              { model: Comment }
          ],
      });

      const articles = dbArticleData.map(article => article.get({ plain: true }));

      res.render('homepage', {
          articles,
          loggedIn: req.session.loggedIn
      });

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// GET one article

router.get('/article/:id', async (req, res) => {
  try {
      const dbArticleData = await Article.findByPk(req.params.id, {
          include: [
              {
                  model: User
              },
              {
                  model: Comment,
                  include: [
                      {
                          model: User,
                          attributes: ['username']
                      }
                  ]
              }
          ],
      });

      const article = dbArticleData.get({ plain: true });

      console.log(article);

      let owner = false;

      if(req.session.user_id === article.user_id){
          owner = true;
      };

      res.render('article', {
          article,
          loggedIn: req.session.loggedIn,
          owner,
      });


  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      console.log(req.session.loggedIn);
      return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});


// router.get('/signup', async (req, res) => {
//     try {

//     } catch (error) {

//     }
// });


// Populate Dashboard for the logged in User

router.get('/dashboard', async (req, res) => {
  try {

      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Article }],
      });

      const user = userData.get({ plain: true });

      res.render('dashboard', {
          user,
          loggedIn: req.session.loggedIn,
          // loggedIn: true,
      });

      console.log(user);

  } catch (error) {
      res.status(400).json(error);
  }
})

module.exports = router;