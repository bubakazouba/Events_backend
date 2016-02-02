var express = require('express');
var router = express.Router();

var FriendHittups = require('../models/FriendHittups');
var HittupHelper = require('../modules/HittupHelper');
var EventOrganizers = require('../models/EventOrganizers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Hello /Hittups!');
});

router.post('/UnjoinHittup', function (req, res) {
    HittupHelper.unjoin(FriendHittups,req, function (result) {
        res.send(result);
    });
});

router.post('/RemoveHittup', function (req, res) {
    HittupHelper.remove(FriendHittups,req, function (result) {
        res.send(result);
    });
});
router.post('/GetHittup', function (req, res) {
    HittupHelper.getFriendHittup(req, function (result) {
        res.send(result);
    });
});

router.post('/GetAllHittups', function (req, res) {
    HittupHelper.getAllFriendHittups(req, function (result) {
        res.send(result);
    });
});

router.post('/InviteFriends', function (req, res){
    HittupHelper.invite(FriendHittups, req, function (result){
        res.send(result);
    });
});

router.post('/UpdateHittup', function (req, res) {
    HittupHelper.update(FriendHittups, req, function (result) {
        res.send(result);
    });
});

router.post('/JoinHittup', function (req, res) {
    HittupHelper.join(FriendHittups, req, function (result) {
        res.send(result);
    });
});

router.post('/PostHittup', function (req, res, next) {
    HittupHelper.postFriendHittup(req, function (result) {
        res.send(result);
    });
}); 

module.exports = router;