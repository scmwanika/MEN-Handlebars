const express = require('express');
// const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.urlencoded());
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});
const port = process.env.PORT || 8080;
app.listen(port);
