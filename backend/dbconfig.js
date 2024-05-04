let pg= require('pg')
let connection = new pg.Client({
    host:'localhost',
    user:'postgres',
    password:'255280',
    database:'todolist',
    port:5432,
})

connection.connect((error) =>{
    if(error){console.log("Error",error)}
 else{
    console.log("connected...")
 }
})

module.exports = connection;