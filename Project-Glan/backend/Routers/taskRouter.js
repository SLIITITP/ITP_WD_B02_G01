const express = require('express');
const router = express.Router();
const { getTask, setTask, updateTask, deleteTask, getTaskById } = require('../Controllers/taskController');
//const { protect } = require('../middleware/authMiddleware');

router.route('/').post(setTask).get(getTask);
router.route('/:id').put(updateTask).delete(deleteTask);
router.route('/:id').get(getTaskById)

module.exports = router;