const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const errorController = require('./controllers/error');
const User = require('./models/users');

const port = 3000;

const app = express();

app.set('view engine', 'ejs'); // Replace 'ejs' with your actual template engine
app.set('views', 'views');

const usersRoutes = require('./routes/userlist');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(usersRoutes);

app.use(errorController.get404);


sequelize.sync()
  .then(result => {
        // console.log(result);
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
  })
  .catch(err => {
      console.log(err);
  })
