var express = require('express'),
    router = express.Router(),
    mongodb = require('../modules/db'),
    mongoose = require('mongoose'),
    Logger = require('../modules/Logger'),
    ObjectID = require('mongodb').ObjectID,
    EventHittupsSchema = require('../models/EventHittups'),
    Helpers = require('../modules/Helpers');

function remove(HittupSchema, req, callback) {
    if(!Helpers.check(["owneruid","ownerName","hittupuid"], req))
        return;

    if(!mongodb.db) {return callback({"success": "false", "error": "DB not connected"});}

    var body = req.body,
        owneruid = body.owneruid,
        ownerName = body.ownerName,
        hittupuid = body.hittupuid;

    var query = HittupSchema.findById(ObjectID(hittupuid));
    query.populate({
        path: 'usersJoined',
        select: 'deviceTokens'
    });
    query.exec(function (err, hittup) {
        if(err){
            Logger.log(err.message,req.connection.remoteAddress, inviteruid, "function: invite");
            return callback({"success": false, "error": err.message});
        }

        hittup.remove();
        var deviceTokens = [];
        for (var i = hittup.usersJoined.length - 1; i >= 0; i--) {
            for (var j = hittup.usersJoined[i].deviceTokens.length - 1; j >= 0; j--) {
                deviceTokens.push(hittup.usersJoined[i].deviceTokens[j]);
            }
        }
        apn.pushNotify(ownerName + "'s \"" + hittup.title + "\" was canceled",deviceTokens);

        callback({"success": "true"});
    });
}


function getAllEventHittups(req, callback) {
    if(!Helpers.check(["timeInterval"], req))
        return;

    if(!mongodb.db) {return callback({"success": false, "error": "DB not connected"});}

    var body = req.body,
        startsIn = body.timeInterval[0],
        endsFrom = body.timeInterval[1];

    if(body.hasOwnProperty("coordinates") && body.hasOwnProperty("maxDistance")) {
        var longitude = body.coordinates[0],
            latitude = body.coordinates[1],
            maxDistance = body.maxDistance;
            
        var query = EventHittupsSchema.find({
            loc: {
                $nearSphere: [longitude, latitude],
                $maxDistance: maxDistance //in kilometers
            }
        });
    }
    else {
        var query = EventHittupsSchema.find({});
    }
    
    query.where('dateStarts').lte(Date.now()/1000 + startsIn);//only show event hittups that are starting in less than <timeInterval> seconds
    query.$where(Date.now()/1000 - endsFrom + ' <= this.dateStarts + this.duration'); // hittups that are still active or ended 30 min ago
    query.populate({
        path: 'usersInvited usersJoined',
        select: 'firstName lastName fbid'
    });
    query.populate({
        path: 'owner',
        select: 'name imageurl'
    });
    query.lean();
    query.exec(function (err,results) {
       if(err) {
           callback({"success": false, "error": err.message});
           return Logger.log(err.message,req.connection.remoteAddress, null, "function: get");
       }
       callback(results);
    });
}

function postEventHittup(req, callback) {
    if(!Helpers.check(["uid","title","isPrivate","duration","coordinates","image"], req))
        return;

    if(!mongodb.db) {return callback({"success": "false", "error": "DB not connected"});}

    var body = req.body;
    getImageurls(body.image, function (HQImageurl, LQImageurl) {
        var hittup = new EventHittupsSchema({
            ownerName: body.ownerName,
            title: body.title,
            isPrivate: body.isPrivate,
            duration: body.duration,
            dateStarts: body.dateStarts,
            description: body.description,
            emoji: body.emoji,
            images : [{
                lowQualityImageurl: LQImageurl,
                highQualityImageurl: HQImageurl
            }],
            loc: {
                type: "Point",
                coordinates: body.coordinates
            }
        });

        geolocation.geoReverseLocation(hittup.loc.coordinates, function (err, location) {
            hittup.loc.city = location.city;
            hittup.loc.state = location.state;
            hittup.save(function (err, insertedHittup) {
                if (err) {
                    callback({"success": false, "error": err.message});
                    return Logger.log(err.message,req.connection.remoteAddress, null, "function: post");
                } 
                callback({"success": true, "uid": insertedHittup.id});
            }); //end hittup.save
        }); //end geoLocation
    }); //end getImageurls
}

module.exports = {
    getAllEventHittups: getAllEventHittups,
    postEventHittup: postEventHittup,
    remove: remove
};