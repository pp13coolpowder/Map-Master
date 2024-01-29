const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ViteExpress = require("vite-express");
const {data} = require('./DB/data')
const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
data()
const  {readdirSync} = require('fs');
readdirSync(__dirname + '/Route').map((r)=>app.use(require('./Route/' + r)))
ViteExpress.listen(app, 4000, () =>
  console.log("Server is listening on port 4000...")
);
