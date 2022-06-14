//DB Connection
require('./db/connect');
require('dotenv').config();

const express = require('express');
const app = express();
const tasksRoute = require('./routes/tasks');
const morgan = require('morgan');
const connectDB = require('./db/connect');
const custom404 = require('./middlewares/custom404');
const errorHandler = require('./middlewares/errorHandler');

app.use('/api', morgan('combined'));
app.use('/api', express.json());

//By this we remove '/api/products' from the METHODS URL in route file.
app.use('/api/tasks', tasksRoute);

//This renders custom message for 404 APIs
app.use(custom404);

//This error handler is used to log or send the error from one place
app.use(errorHandler);

(async () => {
  try {
    //DB Connection
    await connectDB(process.env.MONGO_DB_URI);

    //Server
    app.listen(6000, () => {
      console.log('Server has started on port 6000...');
    });
  } catch (error) {
    console.log(error);
  }
})();
