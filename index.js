
const app = require('express')();
const port = process.env.PORT || 3000;
const passport = require('passport');
const bodyParser = require('body-parser');
const { connectMongo } = require("./config/connect");
const routes = require('./routes/index');
const cors = require("cors");
const { collection, insertMany } = require('./models/movies-schema');

app.use(bodyParser.urlencoded({ extended: false }))
connectMongo();
app.use(bodyParser.json());
app.use(cors())
app.get('/1', (req, res) => {
  res.send('this 2nd page');
})
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

app.use('/api', routes);



