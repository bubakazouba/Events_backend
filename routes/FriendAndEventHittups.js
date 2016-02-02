var express = require('express');
var router = express.Router();

var User = require('../models/Users');
var HittupHelper = require('../modules/HittupHelper');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Hello /FriendAndEventHittups!');
});

router.post('/GetAllHittups', function (req, res) {
    HittupHelper.getAllFriendHittups(req, function (friendHittups) {
        HittupHelper.getAllEventHittups(req, function (eventHittups) {
            if (friendHittups.hasOwnProperty("success") && friendHittups.success == "false") {
                 return res.send(friendHittups);
            }

            if (eventHittups.hasOwnProperty("success") && eventHittups.success == "false") {
                 return res.send(eventHittups);
            }

            for (var i = friendHittups.length - 1; i >= 0; i--) {
                friendHittups[i].hittupType = "friend";
            };

            for (var i = eventHittups.length - 1; i >= 0; i--) {
                eventHittups[i].hittupType = "event";
            };

            res.send({"success": "true", "hittups": eventHittups.concat(friendHittups)});
        });
    });
});


module.exports = router;