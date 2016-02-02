var express = require('express'),
    mongodb = require('../modules/db'),
    mongoose = require('mongoose'),
    Logger = require('../modules/Logger'),
    ObjectID = require('mongodb').ObjectID,
    EventHittupsSchema = require('../models/EventHittups');

function remove(HittupSchema, req, callback) {
    if(!mongodb.db) {return callback({"success": "false", "error": "DB not connected"});}

    var body = req.body,
        hittupuid = body.hittupuid;

    var query = HittupSchema.findById(ObjectID(hittupuid));
    query.exec(function (err, hittup) {
        if(err){
            Logger.log(err.message,req.connection.remoteAddress, inviteruid, "function: invite");
            return callback({"success": false, "error": err.message});
        }

        hittup.remove();

        callback({"success": "true"});
    });
}


function getAllEventHittups(req, callback) {
    if(!mongodb.db) {return callback({"success": false, "error": "DB not connected"});}

    var body = req.body,
        startsIn = body.timeInterval[0],
        endsFrom = body.timeInterval[1];

    var query = EventHittupsSchema.find({});
    
    query.where('dateStarts').lte(Date.now()/1000 + startsIn);//only show event hittups that are starting in less than <timeInterval> seconds
    query.$where(Date.now()/1000 - endsFrom + ' <= this.dateStarts + this.duration'); // hittups that are still active or ended 30 min ago
    query.exec(function (err,results) {
       if(err) {
           callback({"success": false, "error": err.message});
           return Logger.log(err.message,req.connection.remoteAddress, null, "function: get");
       }
       callback(results);
    });
}

function postEventHittup(req, callback) {
    if(!mongodb.db) {return callback({"success": "false", "error": "DB not connected"});}

    var body = req.body;
    var hittup = new EventHittupsSchema({
        owner: {
            name: body.ownerName,
            imageurl: body.ownerImageurl
        },
        title: body.title,
        duration: body.duration,
        dateStarts: body.dateStarts,
        description: body.description,
        emoji: body.emoji,
        images : [{
            lowQualityImageurl: body.imageurl,
            highQualityImageurl: body.imageurl
        }],
        loc: {
            type: "Point",
            coordinates: body.coordinates
        }
    });

    hittup.save(function (err, insertedHittup) {
        if (err) {
            callback({"success": false, "error": err.message});
            return Logger.log(err.message,req.connection.remoteAddress, null, "function: post");
        } 
        callback({"success": true, "uid": insertedHittup.id});
    }); //end hittup.save
}

module.exports = {
    getAllEventHittups: getAllEventHittups,
    postEventHittup: postEventHittup,
    remove: remove
};