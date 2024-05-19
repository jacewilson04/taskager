const router = require('express').Router();
const { Task } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage with tasks
router.get('/', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const tasks = await Task.findAll({ where: { user_id } });

    res.render('homepage', {
      tasks: tasks.map(task => task.get({ plain: true })),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Render the update task page
router.get('/update-task/:id', withAuth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.session.user_id;

    const task = await Task.findOne({
      where: {
        id: taskId,
        user_id: userId,
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.render('updateTask', {
      task: task.get({ plain: true }),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
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
