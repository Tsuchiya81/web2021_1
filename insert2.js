const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into drink ("name","price","company_id") values ("綾鷹","150","1");`,
  `insert into drink ("name","price","company_id") values ("aminoSUPLI","120","2");`,
  `insert into drink ("name","price","company_id") values ("生茶","150","3");`,
  `insert into drink ("name","price","company_id") values ("ほっとレモン","120","4");`,
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


