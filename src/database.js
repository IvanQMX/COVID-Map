const mongoose = require('mongoose');
const chalk = require('chalk');

const URI = process.env.URI_DB;

mongoose.connect( URI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => console.log( chalk.blue.bold('Database:'), chalk.green.bold('Connected') ) )
    .catch( e => console.log(  chalk.blue.bold('Database:'), chalk.red.bold('Error\n'), e ) );

module.exports = mongoose;