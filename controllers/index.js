const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const createTaskRoutes = require('./createTaskRoutes');
const updateTaskRoutes = require('./updateTaskRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/create-task', createTaskRoutes);
router.use('/update-task', updateTaskRoutes);

module.exports = router;