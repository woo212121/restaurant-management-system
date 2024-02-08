/**
 * @file Core script of the api. Starts server and manages ports and routes.
 * @version 1.0.0
 */
//initializing dependencies and constants needed for the api.
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;
const app = express();
const staffRoute = require('./routes/staff-routes');
const menuRoute = require('./routes/menu-routes');

//middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

//test staff login route (this is temporary)
app.use('/signin', staffRoute);
app.use('/signin/create-account', staffRoute);

//testing retrieval of menu items
app.use('/menu', menuRoute);

/**
 * HTTP get request. sends the result from the database.
 */
app.get('/', async (req,res) => {
  try {
    const data = await pool.query('SELECT * FROM test_table WHERE id = 1');
    res.status(200).send(data.rows[0])
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

})

/**
 * Listens for connections on port 9000 and
 * initializes http server if found.
 */
app.listen(port, function (err){
  if (err) console.log(err);
  console.log(`Server listening on Port: ${port}`);
});
