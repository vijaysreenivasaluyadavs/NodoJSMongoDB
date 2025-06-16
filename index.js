'use strict'

const express = require('express');
const bodyParser = require('body-parser'); // To parse POST body
const MongoDB = require('body-parser'); // To parse POST body

const app = module.exports = express()

// This is to parse the post body
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
  console.log('I am here');
  res.render('login_page');
});

app.get('/', function(req, res){
  res.send('Hello World How are you sunil');
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/FrontEnd_Pages');
// use res.render to load up an ejs view file

/* istanbul ignore next 
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
*/

// Handle POST request
app.post('/response_1', (req, res) => {
  console.log('Received :', req.body.v_username);
  const username1 = req.body.v_username;
  console.log('Received username:', username1);
  res.send(`Hello, ${username1}`);
});

app.post('/response_2', (req, res) => {
  const username = req.body.username1;
  console.log('username:', username);

  const username2 = username + " 2ndstring";
  console.log('username2:', username2);

  const yourJsonObject = {
    chikka: username2
  };
  res.render('GrandResponse', { myData: yourJsonObject });
});


app.listen(8080);
console.log('Vijay Server is listening on port 8080');
