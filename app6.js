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
            res.render('insert', {data:data});
        })
    })
})


app.get("/insert", (req, res) => {
  console.log(req.query);
  let sql = "insert into drink (name,company_id,cal,size) values (" + `"` + req.query.drink + `"` + "," + req.query.cid + "," + req.query.cal + "," + req.query.pop +");";
  //console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      //console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('result1', {mes:"追加しました"});
  });
});
//console.log(req.body);
});


app.get("/insert1", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from drink where id = (select MAX(id) from drink);", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          console.log(data);
            res.render('insertothers', {data:data});
        })
    })
})


app.get("/insertothers", (req, res) => {
  console.log(req.query);
  let sqls = [
    "insert into sell (drink_id,price) values (" + req.query.drink +","+`"`+ req.query.price +`"`+") ;",
    "insert into comment (drink_id,message) values (" + req.query.drink +","+`"`+ req.query.message +`"`+") ;"
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


app.get("/detail", (req, res) => {
  console.log(req.query)
    db.serialize( () => {
      db.all("select drink.name, drink.cal, drink.size, sell.price, comment.message, company.name as name2 from drink join company on drink.company_id = company.id join sell on drink.id = sell.drink_id join comment on drink.id = comment.drink_id where drink.id=" + req.query.id +";", (error, data) => {
        if( error ) {
          res.render('error', {mes:"最初からやり直してください"});
        }
        //console.log(data);
        res.render('detail', {data:data});
      })
    })
})



/*

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
