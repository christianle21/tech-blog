const router = require('express').Router();
const { User, Note, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comments = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    if (req.session.logged_in) {
      res.render('homepage', {
        comments,
        logged_in: req.session.logged_in,
        username: req.session.username
      });
    } else {
      res.render('homepage', {
        comments
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
  console.log("Hello Comment ID++++")
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Note,

          include: [
            {
              model: User,
              attributes: ['name'],
            }
          ]
        }
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }

    const comment = commentData.get({ plain: true });
    console.log(comment, ' Looking for note data')
    res.render("comment", {
      comment,
      logged_in: req.session.logged_in,
      username: req.session.username,
    })
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/add-comment', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const user = userData.get({ plain: true });
    const username = user.name.split(' ').join('');
    res.render('add-comment', {
      ...user,
      username: username,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit-comment/:id', withAuth, async (req, res) => {
  try {

    const commentData = await Comment.findByPk(req.params.id, {

      include: [{ model: User }],
    });

    const comment = commentData.get({ plain: true });
    console.log(comment)
    res.render('edit-comment', {
      ...comment,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.signed_up) {
    res.redirect('/account-comment');
    return;
  }
  res.render('signup');
});

router.get('/account-comment', async (req, res) => {
  try {
    if (req.session.logged_in) {
      const commentData = await Comment.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          }
        ]
      })

      if (commentData.length === 0) {
        console.log('there is no data, but here is the user name', req.session.username)
        res.render('account-comment', {
          logged_in: true,
          username: req.session.username
        })
        return;
      }

      const comments = commentData.map((comment) =>
        comment.get({ plain: true })
      );

      res.render('account-comment', {
        comments,
        logged_in: req.session.logged_in,
        username: req.session.username
      });
    }
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/account-comment');
    return;
  }

  res.render('login');
});


module.exports = router;