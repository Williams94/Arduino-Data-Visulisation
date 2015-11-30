/**
 * Created by rbwilliams on 28/11/2015.
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/arduinoData';
var database = "";

function startDatabase(){
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        //assert.equal(null, err);
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
        }
        database = db;
    });
}


var insertSensorValue = function(db, values) {

    var date = values.substring(0,10);
    var time = values.substring(11, values.indexOf('L')-1);
    var light = values.substring(values.indexOf('L')+2, values.indexOf('T')).trim();
    var temp = values.substring(values.indexOf('T')+2).trim();

   database.collection('sensorValues').insertOne( {
        "date" : date,
        "time" : time,
        "light" : parseInt(light),
        "temperature" : parseInt(temp)
    }, function(err, result) {
        //assert.equal(err, null);
        //callback(result);
    });
        console.log("Stored: " + date + " " + time + " "  + light + " " + temp);
};

function login(){

}


exports.start = startDatabase;
exports.insert = insertSensorValue;