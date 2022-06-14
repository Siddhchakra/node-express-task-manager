const {
  getTasks,
  createTask,
  getTaskDetails,
  updateTask,
  deleteTask
} = require('../../controllers/tasks');

const router = require('express').Router();

//Another way to create routes for EXPRESS
router.route('/').get(getTasks).post(createTask);

router.route('/:id').get(getTaskDetails).patch(updateTask).delete(deleteTask);

module.exports = router;
