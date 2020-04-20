const express = require('express');
const chalk = require('chalk');
const path = require('path');
const morgan = require('morgan');
var cron = require('node-cron');
const helpers = require('./helpers');
var moment = require('moment')
moment().format();

const app = express();

// Env vars (developing mode)
if (process.env.NODE_ENV !== 'production') {
    console.log(chalk.blue.bold('Production Mode:'), chalk.red.bold('OFF'));
    require('dotenv').config();
}
else {
    console.log(chalk.blue.bold('Production Mode:'), chalk.green.bold('ON'));
}


// Database
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use( '/api/national', require('./routes/national.routes') );
app.use( '/api/states', require('./routes/state.routes') );

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), () => {
    console.log(chalk.blue.bold('Server on port:'), chalk.green.bold( app.get('port') ) );

    cron.schedule('20 1 * * *', () => {
        var now = moment().format('LTS');
        console.log('running every minute', now);
    });

    helpers.fecthData('https://covid19.sinave.gob.mx/Log.aspx/Grafica22', false);
    // helpers.setStates(false);

});