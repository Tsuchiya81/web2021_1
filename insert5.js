const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into comment ("drink_id","message") values ("1","綾鷹って感じ");`,
  `insert into comment ("drink_id","message") values ("2","aminoSUPLI初めて飲んだ");`,
  `insert into comment ("drink_id","message") values ("3","生茶だ");`,
  `insert into comment ("drink_id","message") values ("4","ほっとレモンって美味しいよね");`,
  `insert into comment ("drink_id","message") values ("5","結局お～いお茶に戻る");
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
