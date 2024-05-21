const router = require('express').Router();
const { Task } = require('../models');

router.get('/', (req, res) => {
    res.render('createtask');
});

// Creates a new task for the user and adds it to the database
router.post('/save', async(req, res)=> {
    try{
        const {name, details, date} = req.body;
        const user_id = req.session.user_id; 
        
        if(!name || !user_id){
            return res.status(400).json({message: 'Task name and user ID are required' });
        }

        const newTask = await Task.create({
            name,
            details,
            date,
            user_id,
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;