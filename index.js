const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const PublicDirectoryPath = path.join(__dirname,'./public')
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, './views'));
app.use(express.static(PublicDirectoryPath))
app.use(express.json()) 
require('./MongoDB/MongooseConnection')
app.use(cors())
app.use('/',require('./Router/route'));


const Port = process.env.PORT || 3000

app.listen(Port,(req,res)=>{

    console.log(`appplication is running in ${Port}` )

})