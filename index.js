'use strict'

const express = require('express');
const bodyParser = require('body-parser'); // To parse POST body
const { MongoClient } = require('mongodb');
const path = require('path');



const app = module.exports = express()

// Connection URL
//const url = 'mongodb://localhost:27017';  // Replace with your MongoDB URI
const url = 'mongodb+srv://vijayyadavs:4idF7xjM7ni8h1Aq@sample.sc7oj2n.mongodb.net/';  // Replace with your MongoDB URI
const client = new MongoClient(url);
// Database Name
const dbName = 'MySampleProject';

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
app.set('views', path.join(__dirname, 'FrontEnd_Pages'));
// use res.render to load up an ejs view file

/* istanbul ignore next 
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
*/

// Handle POST request
app.post('/response_1', async (req, res) => {
  console.log('Received :', req.body);
  const vj_district = req.body.v_district;
  const vj_year = req.body.v_year;
  const vj_month = req.body.v_month;
  const vj_escom = req.body.v_escom;
  console.log('Received District:', vj_district);
  console.log('Received Year:', vj_year);
  console.log('Received ESCOM:', vj_escom);
  console.log('Received month:', vj_month);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = await client.db(dbName);
    const collection = await db.collection('Vijay_Collection');

    // Insert a document
    const insertResult = await collection.insertOne({ district: vj_district, year: vj_year, escomId: vj_escom, month: vj_month.toUpperCase() });
    console.log('Inserted document =>', insertResult.insertedId);

    // Find the document
    const findResult = await collection.findOne({ district: vj_district, year: vj_year, escomId: vj_escom, month: vj_month.toUpperCase() });
    console.log('Found document =>', findResult);
    res.render('GrandResponse', { findResult });
  } 
  catch (err) {
    console.error('MongoDB Error:', err);
  } 
  finally {
    await client.close();
  }
});

app.post('/response_3', async (req, res) => {
  console.log('Received :', req.body);
  const vj_district = req.body.v_district;
  const vj_year = req.body.v_year;
  const vj_month = req.body.v_month;
  const vj_escom = req.body.v_escom;
  console.log('Received District:', vj_district);
  console.log('Received Year:', vj_year);
  console.log('Received ESCOM:', vj_escom);
  console.log('Received month:', vj_month);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = await client.db(dbName);
    const collection = await db.collection('Vijay_Collection');

    // Insert a document
    const insertResult = await collection.insertOne({ district: vj_district, year: vj_year, escomId: vj_escom, month: vj_month.toUpperCase() });
    console.log('Inserted document =>', insertResult.insertedId);
    console.log('Inserted Status =>', insertResult.acknowledged);
    if (insertResult.acknowledged == true)
      res.render('successfully_Inserted', { myData: insertResult });
    else
      res.render('Failed_2_Insert', { myData: insertResult });

    //res.render('generic_response', { insertResult });
  } 
  catch (err) {
    console.error('MongoDB Error:', err);
  } 
  finally {
    await client.close();
  }
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
