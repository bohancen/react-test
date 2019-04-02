const express = require('express')
const path = require('path')
const port = 1024
const app = express()

app.use('/', express.static(path.join(__dirname, './build')))

app.listen(port,function(){
  console.log(port)
})