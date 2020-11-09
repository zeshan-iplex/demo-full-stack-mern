// Creating connection with database
const { connectMongodb } = require('./database/connection');
connectMongodb()

//require chalk module to give colors to console text
const chalk = require('chalk');
const info = chalk.bold.cyan;
const exit = chalk.bold.red;



const express = require('express')
var cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()
const port  = process.env.PORT ? process.env.PORT : 3000

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ limit: '5mb' }))

const { verifyToken, HasRole } = require('./middlewares/Auth')

const authRoutes = require('./routes/Auth')
const clientRoutes = require('./routes/Client')
const petRoutes = require('./routes/Pet')

const clinicRoutes = require('./routes/Clinic')
const doctorRoutes = require('./routes/Doctor')

app.use('/auth', authRoutes )
app.use('/client', clientRoutes )
app.use('/pet', petRoutes )

app.use('/clinic', clinicRoutes )
app.use('/doctor', doctorRoutes )

app.get('/', verifyToken, HasRole(['Admin', 'Doctor']), (req, res) => {
    res.send('Hello World!')
})

// If something broke in application
app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status( err.status || 500).send('Something went wrong!')
})

// if invalid endpoint is called
app.use('*' , ( req, res ) =>{
    res.status(404).json({ message: 'Route not found' })
})


const server = app.listen(port, () => {
  console.log(info(`Practice app listening at http://localhost:${port}`))
})

process.on('SIGTERM', () => {
    server.close(() => {
      console.log(exit('Process terminated'))
    })
})