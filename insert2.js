const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into drink ("name","price","company_id","cal","size") values ("綾鷹","1","0","525");`,
  `insert into drink ("name","price","company_id","cal","size") values ("aminoSUPLI","2","89","555");`,
  `insert into drink ("name","price","company_id","cal","size") values ("生茶","3","0","525");`,
  `insert into drink ("name","price","company_id","cal","size") values ("ほっとレモン","4","117","280");`,
  `insert into drink ("name","price","company_id","cal","size") values ("お～いお茶","5","0","600");
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


