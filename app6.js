const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));


app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  const message = "飲み物の記録が見られるよ";
  res.render('show7', {mes:message});
});

/*app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})*/
/*app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})*/

app.get("/top", (req, res) => {
  console.log(req.query)
    db.serialize( () => {
        db.all("select id, name, cal, size from drink;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('selectAll', {data:data});
        })
    })
})


app.get("/itiran", (req, res) => {
  console.log(req.query)
    db.serialize( () => {
        db.all("select id, name, cal, size from drink order by " + req.query.item +" "+ req.query.desc +";", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('selectAll', {data:data});
        })
    })
})

/*app.get("/insert", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})*/


app.get("/insele", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from company ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('insert1', {data:data});
        })
    })
})

app.get("/insert", (req, res) => {
  console.log(req.query);
  let sqls = [
    "insert into drink (name,company_id,cal,size) values (" + `"` + req.query.drink + `"` + "," + req.query.cid + "," + req.query.cal + "," + req.query.pop +");",
    "insert into sell (drink_id,price) values (" +`"`+"NULL"+`"`+","+`"`+"NULL"+`"`+") ;"
  ]
  for( let sql of sqls ){
    console.log(sql);
    db.serialize( () => {
      db.run( sql, (error, data) => {
        console.log(error);
        if(error) {
          res.render('error', {mes:"最初からやり直してください"});
        }
        res.render('result', {mes:"追加しました"});
      });
    });
//console.log(req.body);
  } 
});


/*
app.get("/insert", (req, res) => {
  console.log(req.query);
  let sql = "insert into drink (name,company_id,cal,size) values (" + `"` + req.query.drink + `"` + "," + req.query.cid + "," + req.query.cal + "," + req.query.pop +") ; insert into sell (drink_id,price) values (6,200) ;";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result', {mes:"追加しました"});
  });
});
//console.log(req.body);
});

app.get("/insert", (req, res) => {
  console.log(req.query);
  let sql = "insert into drink (name,company_id,cal,size) values (" + `"` + req.query.drink + `"` + "," + req.query.cid + "," + req.query.cal + "," + req.query.pop +") ; insert into sell (drink_id,price) values (" + `"NULL"` + "," + `"NULL"` + ") ;";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result', {mes:"追加しました"});
  });
});
//console.log(req.body);
});



app.get("/insert", (req, res) => {
  console.log(req.query);
  let sql = "insert all into drink (name,company_id,cal,size) values (" + `"` + req.query.drink + `"` + "," + req.query.cid + "," + req.query.cal + "," + req.query.pop +") into sell (drink_id,price) values (" + `"NULL"` + "," + `"NULL"` + ") into comment (drink_id, message) values (" + `"NULL"` + "," + `"NULL"` + ");";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result', {mes:"追加しました"});
  });
});
//console.log(req.body);
});

app.get("/insert", (req, res) => {
  console.log(req.query);
  let sql = "insert into drink (name,company_id,cal,size) values (" + `"` + req.query.drink + `"` + "," + req.query.cid + "," + req.query.cal + "," + req.query.pop +");";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result', {mes:"追加しました"});
  });
});
//console.log(req.body);
});



app.get("/insertid1", (req, res) => {
    db.serialize( () => {
        db.all("select id name from drink where id = ( select MAX(id) from drink) ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('insert2', {data:data});
        })
    })
})



app.get("/insertsell", (req, res) => {
  console.log(req.query);
  let sql = "insert into sell (drink_id,price) values (" + `"` + req.query.name + `"` + "," + req.query.price + ");";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('/insertid2');
  });
});
//console.log(req.body);
});


app.get("/insertid2", (req, res) => {
    db.serialize( () => {
        db.all("select id name from drink where id = ( select MAX(id) from drink) ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('insert3', {data:data});
        })
    })
})


app.get("/insertcomment", (req, res) => {
  console.log(req.query);
  let sql = "insert into comment (drink_id,message) values (" + `"` + req.query.name + `"` + "," + `"` + req.query.message + `"` +  ");";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result', {mes:"追加しました"});
  });
});
//console.log(req.body);
});
*/

app.get("/desele", (req, res) => {
    db.serialize( () => {
        db.all("select id, name,  cal, size from drink ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('delete', {data:data});
        })
    })
})


app.get("/delete", (req, res) => {
  console.log(req.query);
  let sql = "delete from drink where id ="+ req.query.dri +";";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result', {mes:"削除しました"});
  });
});
//console.log(req.body);
});

app.get("/makerselect", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from company ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('makerselectpage', {data:data});
        })
    })
})



app.get("/makerselect_a", (req, res) => {
    console.log(req.query);
    db.serialize( () => {
        db.all("select drink.id, drink.name, drink.cal, drink.size, company.name as name2 from drink inner join company on drink.company_id = company.id where company_id =" + req.query.dri + ";", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('maker_result', {data:data});
        })
    })
})


app.get("/n_search", (req, res) => {
    console.log(req.query);
    db.serialize( () => {
        db.all("select id, name, cal, size from drink where name like '%" + req.query.name + "%';", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('name_result', {data:data});
        })
    })
})





app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(80, () => console.log("Example app listening on port 80!"));
