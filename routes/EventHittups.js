var express = require('express');
var router = express.Router();

var EventHittups = require('../models/EventHittups');
var HittupHelper = require('../modules/HittupHelper');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Hello /Hittup Events!');
});

router.post('/UnjoinHittup', function (req, res) {
    HittupHelper.unjoin(EventHittups,req, function (result) {
        res.send(result);
    });
});


router.post('/RemoveHittup', function (req, res) {
    HittupHelper.remove(EventHittups,req, function (result) {
        res.send(result);
    });
});


router.post('/GetHittup', function (req, res) {
    HittupHelper.getEventHittup(req, function (result) {
        res.send(result);
    });
});

router.post('/GetAllHittups', function (req, res) {
    HittupHelper.getAllEventHittups(req, function (result) {
        res.send(result);
    });
});

router.post('/InviteFriends', function (req, res){
    HittupHelper.invite(EventHittups, req, function (result){
        res.send(result);
    });
});

router.post('/UpdateHittup', function (req, res) {
    HittupHelper.update(EventHittups, req, function (result) {
        res.send(result);
    });
});

router.post('/JoinHittup', function (req, res) {
    HittupHelper.join(EventHittups, req, function (result) {
        res.send(result);
    });
});

router.post('/PostHittup', function (req, res, next) {
    HittupHelper.postEventHittup(req, function (result) {
        res.send(result);
    });
}); 

module.exports = router;