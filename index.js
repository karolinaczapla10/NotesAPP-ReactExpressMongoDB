const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
//db
const connect = require('./db/mongoose');

//parser - przetwarzanie pol
app.use(bodyParser.json());
//fix cors
app.use(cors());

// routes
app.use('/api', apiRouter);


// server
app.listen(port, function() {
  console.log('Serwer dziala  http://localhost:' + port);
});


