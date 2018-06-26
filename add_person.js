const myArgs = process.argv;


//const pg = require("pg");
const settings = require("./settings");

var pg = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database:  settings.database
  }
  
});

/*
const client = new pg.Client({
	user	: settings.user,
	password: settings.password,
	database: settings.database,
	host	: settings.hostname,
	port	: settings.port,
	ssl	: settings.ssl
});
*/


var query = pg('famous_people')
	.insert({first_name: myArgs[2], last_name: myArgs[3], birthdate: myArgs[4]})
	.then();
	
/*
	.then( () => {
		console.log("I am happy");
	})
	.catch( (err) => {
		console.log(err);
	});
*/

// console.log('Query: ', query);
