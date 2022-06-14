const asyncWrapper = require('../../middlewares/asyncWrapper');
const Task = require('../../models/Task');
const { createCustomError } = require('../../utils/customError');

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res.json({ success: true, tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const { title, completed } = req.body;

  //Mongoose ignores/omit the keys which are not mentioned in the schema
  //E.g. apart from 'title', 'completed' if 'random' key is passed while creating the document
  //     then 'random' key is ignored and the record with 'title' and 'completed' will be created.
  const task = await Task.create({ title, completed });

  res.json({ success: true, task });
});

const getTaskDetails = asyncWrapper(async (req, res, next) => {
  const { id: paramId } = req.params;

  const task = await Task.findOne({ _id: paramId });

  if (!task) {
    return next(createCustomError('Task not found!', 404));
  }

  res.json({ success: true, task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: paramId } = req.params;
  const { title: paramTitle, completed: paramCompleted } = req.body;

  const task = await Task.findOneAndUpdate(
    {
      _id: paramId
    },
    { title: paramTitle, completed: paramCompleted },
    {
      new: true, //This will return the updated record on successful update
      runValidators: true //This will run the validator while update that are set in schema
    }
  );

  if (!task) {
    return next(createCustomError('Task not found!', 404));
  }

  res.json({ success: true, task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: paramId } = req.params;

  const task = await Task.findOneAndDelete({ _id: paramId });

  if (!task) {
    return next(createCustomError('Task not found!', 404));
  }

  res.json({ success: true, task });
});

module.exports = {
  getTasks,
  createTask,
  getTaskDetails,
  updateTask,
  deleteTask
};
