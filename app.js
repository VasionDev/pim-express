// external import
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require("cors");
var cron = require('node-cron');

// internal import 
const { notFoundHandler, errorHandler } = require('./middleware/common/errorHandler')
const routerV1 = require('./router/routerV1');
const { saveMvTokenToFile } = require('./utilities/mvAuthToken')

const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log('Database connected successfully')
    app.listen(process.env.PORT || 3000, () => {
        console.log(process.env.NODE_ENV);
        console.log(`Server is currently 🏃 on port ${process.env.PORT}`)
    })
})
.catch(err=> {
    console.log(err)
})

// require parser
app.use(cors({origin: '*'}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))

// corn func
cron.schedule('*/30 * * * *', async () => {
    console.log('running a task every thirty minutes for update access token');
    await saveMvTokenToFile()
})

// router
app.get('/', (req, res) => {
	res.json({message: 'okay', site: 'Pruvit API'});
})
app.use('/api/v1', routerV1)

// not found handler
app.use(notFoundHandler)
// error handler
app.use(errorHandler)
