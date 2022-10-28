const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into company ("name") values ("コカコーラ");`,
  `insert into company ("name") values ("キリン");`,
  `insert into company ("name") values ("サントリー");`,
  `insert into company ("name") values ("アサヒ");`,
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