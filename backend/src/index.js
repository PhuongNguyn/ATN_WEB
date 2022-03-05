const express = require('express')
const app = express()
const port = 4000
const morgan = require('morgan');
const path = require('path');
const db = require('./config/database/database')
const fileUpLoad = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors');
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')

const cookieParser = require('cookie-parser');

app.use(cookieParser());


dotenv.config();

db.connect();


app.use(fileUpLoad());
app.use(express.json())
app.use(morgan('combined'))
app.use(bodyParser.json({limit: "50mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
app.use(cors());
router(app);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})