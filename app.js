const port = 3000;

const express = require('express');
const app = express();

app.get("/", function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});


app.use('/public', express.static('public'));
app.listen(port);
