let connection = require("./dbconfig");
let express = require("express");
// const bodyParser = ('body-parser');
let cors = require("cors");

let app = express();
// app.use(bodyParser.json());
app.use(express.json());
let port = 4000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/view", function (req, res) {
  let SQLquery = "SELECT * FROM todo";
  connection.query(SQLquery, function (error, result) {
    if (error) {
      console.log("Error", error.sqlMessage);
    } else {
      res.send(result.rows);
    }
  });
});

app.post("/add", function (req, res) {
  let { sno, task, status, due_date, completion_date } = req.body;
  let sqlquery = "INSERT INTO todo VALUES ($1,$2,$3,$4,$5)";
  connection.query(sqlquery,[sno, task, status, due_date, completion_date], function (error, result) {
      if (error) {
        console.log("Error", error.message);
      } else {
        res.send(result);
      }
    }
  );
});

// app.put("/sno/:id", function (req, res) {
//   let { name, email } = req.body;

//   let id = req.params.id;

//   let sqlquery = "UPDATE todo SET sno=$1,task =$2 WHERE id =$2";
//   connection.query(sqlquery, [sno, task, ], function (error, result) {
//     if (error) {
//       console.log("Error", error.sqlMessage);
//       res.send(error);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.delete("/delete", (req, res) => {
  let id = req.query.sno;
  console.log(id);
  let sqlquery = "DELETE FROM todo WHERE sno= $1 ";
  connection.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.log("Error", error.sqlMessage);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  let sno = req.query.sno;
  let { status, completion_date } = req.body;
  let sqlquery =
    "UPDATE todo SET  status=$1,completion_date=$2 WHERE sno =$3";
  connection.query(
    sqlquery,
    [status, completion_date, sno],
    function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(404).json({ message: "item not found" });
      } else {
        res.send(`${result.rows} data update`);
      }
    }
  );
});

app.patch("/", (req, res) => {
  let id = req.body.sno;
  let { task } = req.body;
  let query = "UPDATE todo SET task = $1 WHERE sno=$2";
  connection.query(query, [task, id], (error, result) => {
    if (error) {
      console.log("error", error.sqlMessage);
      res.status(404).json({ message: "item not found" });
    } else {
      res.send(`${result.rows}data update`);
    }
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
