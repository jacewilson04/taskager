const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
const createTaskRoutes=require('./createTaskRoutes');
router.use('/create-task', createTaskRoutes);



module.exports = router;
