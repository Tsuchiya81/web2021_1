const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));


app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  const message = "Hello world";
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
        db.all("select drink.id, drink.name, drink.price, company.name as name2 from drink inner join company on drink.company_id = company.id;", (error, data) => {
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
        db.all("select drink.id, drink.name, drink.price, company.name as name2 from drink inner join company on drink.company_id = company.id order by " + req.query.item +" "+ req.query.desc +";", (error, data) => {
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
  let sql = "insert into drink (name,price,company_id) values (" + `"` + req.query.drink + `"` + "," + req.query.pop + "," + req.query.cid + ");";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('insert_a', {mes:"追加しました"});
  });
});
//console.log(req.body);
});



app.get("/desele", (req, res) => {
    db.serialize( () => {
        db.all("select id, name, price from drink ;", (error, data) => {
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
    res.render('insert_a', {mes:"削除しました"});
  });
});
//console.log(req.body);
});

app.get("/masele", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from company ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('maselepage', {data:data});
        })
    })
})



app.get("/masele_a", (req, res) => {
    console.log(req.query);
    db.serialize( () => {
        db.all("select drink.id, drink.name, drink.price, company.name as name2 from drink inner join company on drink.company_id = company.id where company_id =" + req.query.dri + ";", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('MSH_a', {data:data});
        })
    })
})


app.get("/n_search", (req, res) => {
    console.log(req.query);
    db.serialize( () => {
        db.all("select drink.id, drink.name, drink.price, company.name as name2 from drink inner join company on drink.company_id = company.id where drink.name like '%" + req.query.name + "%';", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('name_a', {data:data});
        })
    })
})





app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(80, () => console.log("Example app listening on port 80!"));
