const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into sell ("drink_id","price") values ("1","160");`,
  `insert into sell ("drink_id","price") values ("2","120");`,
  `insert into sell ("drink_id","price") values ("3","160");`,
  `insert into sell ("drink_id","price") values ("4","130");`,
  `insert into sell ("drink_id","price") values ("5","160");
  `
  ]
for( let sql of sqls ){
  db.serialize( () => {
	  db.run( sql, (error, row) => {
		  if(error) {
			  console.log('Error: ', error );
			  return;
		  }
		  console.log( "データを追加しました" );
	  });
  });
}
