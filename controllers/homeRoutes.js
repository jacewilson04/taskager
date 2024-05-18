const router = require('express').Router();
const { Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const tasks = await Task.findAll({where: {user_id}});

    res.render('homepage', {
      tasks: tasks.map(task => task.get({plain: true})),
      logged_in : req.session.logged_in,
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Internal server error'});
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;