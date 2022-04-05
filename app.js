const express = require('express');

const PORT = process.env.PORT || 3000

const app = express();

// HANDLEBARS THE VIEW TEMPLATE ENGINE
app.set('view engine', 'hbs');

// SERVING MULTIPLE STATIC DIRECTORIES WITH MIDDLEWARE FUNCTION express.static
app.use(express.static('static/css'));
app.use(express.static('static/img'));
app.use(express.static('uploads'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`App up at port ${PORT}`);
});