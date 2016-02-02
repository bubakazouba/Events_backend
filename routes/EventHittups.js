var express = require('express');
var router = express.Router();

var EventHittups = require('../models/EventHittups');
var HittupHelper = require('../modules/HittupHelper');


router.post('/RemoveHittup', function (req, res) {
    HittupHelper.remove(EventHittups,req, function (result) {
        res.send(result);
    });
});

router.post('/GetAllHittups', function (req, res) {
    HittupHelper.getAllEventHittups(req, function (result) {
        res.send(result);
    });
});

router.post('/PostHittup', function (req, res, next) {
    HittupHelper.postEventHittup(req, function (result) {
        res.send(result);
    });
}); 

module.exports = router;