/**
 * Created by rbwilliams on 28/11/2015.
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/arduinoData';
var database = "";
var collection = "";
var values = "";
var connected = false;

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
        collection = database.collection('sensorValues');
        connected = true;
    });
}

var insertSensorValue = function(db, values) {
    while(!connected){

    }
    var date = values.substring(0,10).trim();
    var time = values.substring(10, values.indexOf('L')-1).trim();
    var light = values.substring(values.indexOf('L')+2, values.indexOf('T')).trim();
    var temp = values.substring(values.indexOf('T')+2, values.indexOf('S')).trim();
    var sound = values.substring(values.indexOf('S')+2/*, values.indexOf('R')*/).trim();
    //var rotation = values.substring(values.indexOf('R')+2).trim();

    collection.insertOne( {
        "date" : date,
        "time" : time,
        "light" : parseInt(light),
        "temperature" : parseInt(temp),
        "sound" : parseInt(sound)/*,
        "rotation" : parseInt(rotation)*/
    }, function(err, result) {
        //assert.equal(err, null);
        //callback(result);
    });
        console.log("Stored: " + date + " " + time + " "  + light + " " + temp + " " + sound/* + " " + rotation*/);
};

function fetch(amount, callback){
    while(!connected){

    }
    collection.find().sort({_id: -1 }).limit(amount).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            //console.log('Found:', result);
            callback(result);
        } else {
            console.log('No documents found');
        }
    });
}



function login(){

}


exports.start = startDatabase;
exports.insert = insertSensorValue;
exports.fetch = fetch;
