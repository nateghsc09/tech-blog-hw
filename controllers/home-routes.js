const router = require('express').Router();
const { Article, User, Comment } = require('../models');


// GET all articles
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


// Get article by id
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


//Redirect through if logged in, otherwse show login

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      console.log(req.session.loggedIn);
      return;
  }
 
  res.render('login');
});


//Dashboard of logged in user

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
         
      });

      console.log(user);

  } catch (error) {
      res.status(400).json(error);
  }
})

module.exports = router;