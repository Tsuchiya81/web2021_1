const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `select drink.id, drink.name, drink.price, company.name as name2 from drink inner join company on drink.company_id = company.id;`;

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.name + ' : ' + data.price + ' : ' + data.name2);
		}
	});
});
