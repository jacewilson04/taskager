const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require("../../utils/auth")


// The middleware for our task api calls
router.use('/*', (req, res, next) => {
    console.log('new request')

    // If user is not logged in bad request
    if (!req.session.logged_in) {
        console.log("User is not logged in failing")
        res.status(400).json("Log in please");
        return
    };
    
    next()
});

// Creates a new task assigned to the user
router.post('/create', async (req, res) => {
    console.log("Creating new task!")
    let user_id = req.session.user_id;

    try {
        // Add task to database
        const taskData = await Task.create({
            name: req.body.taskname,
            details: req.body.taskdetails,
            user_id,
        });

        // TODO! Probally just return the id so that they can use it for editing tasks
        res.status(200).json(taskData);
    } catch (err) {
        console.log(err)
        res.status(400).end();
    }
});
 
// Deletes a task
// router.post('/delete', async (req, res) => {
//     console.log("Deleting a task")
//     let user_id = req.session.user_id;
//     let task_id;

//     try {
//         // Destroy task
//         await Task.destroy({
//             where: {
//                 user_id,
//                 task_id,
//             },
//         });

//         res.status(200).end();
//     } catch (err) {
//         console.log(err)
//         res.status(400).end();
//     }
// });

// Updates a prexisting task
router.post('/update', async (req, res) => {
    console.log("Updating a task")
    let user_id = req.session.user_id;
    let taskId;

    // TODO! Add proper details for updating a task!

    try {
        // Update task data
        await Task.update(
            // Fill in task properties here
            {
                details,
            },
            {
              where: {
                id: taskId,
                user_id,
              },
            },
          );

        res.status(200).end();
    } catch (err) {
        console.log(err)
        res.status(400).end();
    }
});

// Retrieves all of a users tasks
router.get('/getall', async (req, res) => {
    console.log("Retriving users task")

    let user_id = req.session.user_id;


    // TODO! The get task isn't working

    try {
        // Return all of the users tasks
        let queriedTasks = await Task.findAll({
            where: {
                user_id,
            },
        })

        res.status(200).json(queriedTasks)
    } catch (err) {
        console.log(err)
        res.status(400).end();
    }
});


router.delete('/delete/:id', withAuth , async (req, res) => {
    try {
        
        const taskId = req.params.id;
        const userId = req.session.user_id;

        const task = await Task.findOne({
            where: {
                id: taskId,
                user_id : userId,
            },
        });

        if(!task) {
            res.status(404).json({message: 'Task not found or you dont have the permission to delete it.'});
            return;
        }
        // Destroy task
        await task.destroy();
        res.status(200).json({message: 'Task deleted successfully'}); 
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internl server error'}); 
    }
});

module.exports = router;