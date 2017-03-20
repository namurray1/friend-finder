var express = require('express');
var router = express.Router();
var friends = require('../data/friends');

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});

// get all friends
router.get('/friends', function(req, res) {
    res.json(friends.getFriends());
});

// add new friend
router.post('/friends', function(req, res) {
    // add new friend
    if (friends.addFriend(req.body)) {
        // find the best possible friend match
        var match = {
            newFriend: req.body,
            match: friends.findMatch(req.body)
        };
        // match
        res.status(200).send(match);
    }
    return false;
});

module.exports = router;