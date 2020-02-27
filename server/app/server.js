const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.BookMark = require('../api/models/BookmarkModel');
const routes = require('../api/routes/BookMarkRoutes');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
	'mongodb://root:mongo_favorite_book_mark@mongo:27017?authSource=admin',
  { useNewUrlParser: true }
);

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
app.listen(port);
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`Server started on port ${port}`);