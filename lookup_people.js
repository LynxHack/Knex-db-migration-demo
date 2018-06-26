const myArgs = process.argv;

const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
	user	: settings.user,
	password: settings.password,
	database: settings.database,
	host	: settings.hostname,
	port	: settings.port,
	ssl	: settings.ssl
});


function clientsearch(clientcallback, argument){
	clientcallback.query("SELECT * FROM famous_people WHERE first_name = $1::TEXT", [argument], (err, result) => {
                if(err) {
                        return console.error("error running query", err);
                }
                console.log("Found ", result.rows.length, " person(s) by the name ",myArgs[2]);
                for(let i = 0; i < result.rows.length; i++){
                        const id = result.rows[i].id;
                        const firstname = result.rows[i].first_name;
                        const lastname = result.rows[i].last_name;
                        const birthdate = result.rows[i].birthdate;
                        console.log(id,": ",firstname," ",lastname,", born ",birthdate);
                }
                clientcallback.end();
        });
}


client.connect((err) => {
	if(err){
		return console.error("Connection Error", err);
	}

	clientsearch(client, myArgs[2]);
/*
	client.query("SELECT * FROM famous_people WHERE first_name = $1::TEXT", [myArgs[2]], (err, result) => {
		if(err) {
			return console.error("error running query", err);
		}
		console.log("Found ", result.rows.length, " person(s) by the name ",myArgs[2]); 
		for(let i = 0; i < result.rows.length; i++){
			const id = result.rows[i].id;
			const firstname = result.rows[i].first_name;
			const lastname = result.rows[i].last_name;
			const birthdate = result.rows[i].birthdate;	
			console.log(id,": ",firstname," ",lastname,", born ",birthdate);
		}
		client.end();
	});*/
});
