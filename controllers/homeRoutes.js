const router = require('express').Router();
const { Task } = require('../models');
const withAuth = require('../utils/auth');
const moment= require('moment') 
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

router.get('/view-week', withAuth, async (req, res) => {
  try{
    const user_id = req.session.user_id;
    const tasks = await Task.findAll({where : {user_id}});

    var startOfWeek = moment().startOf('week').toDate();
    var endOfWeek   = moment().endOf('week').toDate();

    const currentWeekTasks = tasks.filter(task => {
      const taskDate= new Date(task.date);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });

    res.render('viewWeek', {
      weekTasks: currentWeekTasks.map(task => task.get({plain: true})),
      logged_in: req.session.logged_in,
    });

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get ('/view-month', withAuth, async (req, res) => {
  try{
    const user_id = req.session.user_id;
    const tasks = await Task.findAll({where : {user_id}});

    const today = new Date();
    const  firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const currentMonthTasks = tasks.filter(task => {
      const taskDate= new Date(task.date);
      return taskDate >= firstDayOfMonth && taskDate <= lastDayOfMonth;
    });

    res.render('viewMonth', {
      monthTasks: currentMonthTasks.map(task => task.get({plain: true})),
      logged_in: req.session.logged_in,
    });

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get ('/view-year', withAuth, async (req, res) => {
  try{
    const user_id = req.session.user_id;
    const tasks = await Task.findAll({where : {user_id}});

    const today = new Date();
    const  firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const lastDayOfYear = new Date(today.getFullYear(), 11 ,31);

    const currentYearTasks = tasks.filter(task => {
      const taskDate= new Date(task.date);
      return taskDate >= firstDayOfYear && taskDate <= lastDayOfYear;
    });

    res.render('viewYear', {
      yearTasks: currentYearTasks.map(task => task.get({plain: true})),
      logged_in: req.session.logged_in,
    });

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
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
