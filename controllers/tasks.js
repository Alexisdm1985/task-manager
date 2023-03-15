// Models imports
const Task = require('../model/tasks');

// middlewares
const asyncWrapper = require('../middleware/async');

// CustomErrors imports
const {createCustomError} = require('../errors/custom-error');

// GET 
const getAllTasks = asyncWrapper( async (req, res) => {

    const tasks = await Task.find({});
    res.status(200).json({tasks})
});

const getTask = asyncWrapper( async (req, res, next) => {

    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID }) 

    if (!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404));
        // docs: http://expressjs.com/en/guide/error-handling.html#the-default-error-handler

        // return res.status(404).json({ msg: `No task with id : ${taskID}` }) <-- legacy
    };

    res.status(200).json({ task })
});
// LEGACY controller getTask()
// const getTask = async (req, res) => {
//     try {
//         const taskID = req.params.id;
//         const task = await Task.findOne({ _id: taskID }) 
//         if (!task){
//             return res.status(404).json({ msg: `No task with id : ${taskID}` })
//         };
//         res.status(200).json({ task })

//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };

// };

// POST

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
    
});

// PATCH
const updateTask = asyncWrapper( async (req, res, next) => {

    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new:true, // always return the object
        runValidators:true // check the validators at schema I think
    });
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    };

    res.status(200).json({ task });

});

// DELETE
const deleteTask = async(req, res, next) => {
    
    const taskID = req.params.id;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    };

    res.status(202).json({task})
    // res.status(200).send()
    // res.status(200).json({ task:null, status: 'success' })
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};