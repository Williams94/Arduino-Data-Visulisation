/**
 * Created by rbwilliams on 28/11/2015.
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/arduinoData';

function startDatabase(){
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        //assert.equal(null, err);
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            insertSensorValue(db, function(){
                db.close();
            });

        }
    });
}


var insertSensorValue = function(db, callback) {
    db.collection('sensorValues').insertOne( {
        "lightVal" : "41704620"
    }, function(err, result) {
        //assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback(result);
    });
};

function login(){

}


exports.start = startDatabase;
