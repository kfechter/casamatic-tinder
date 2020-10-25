var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var graph = require('fbgraph');
var LastFmNode = require('lastfm').LastFmNode;
var tumblr = require('tumblr.js');
var foursquare = require('node-foursquare')({ secrets: secrets.foursquare });
var Github = require('github-api');
var Twit = require('twit');
var ordrin = require('ordrin-api');
var stripe = require('stripe')(secrets.stripe.secretKey);
var twilio = require('twilio')(secrets.twilio.sid, secrets.twilio.token);
var Linkedin = require('node-linkedin')(secrets.linkedin.clientID, secrets.linkedin.clientSecret, secrets.linkedin.callbackURL);
var clockwork = require('clockwork')({ key: secrets.clockwork.apiKey });
var paypal = require('paypal-rest-sdk');
var lob = require('lob')(secrets.lob.apiKey);
var ig = require('instagram-node').instagram();
var Y = require('yui/yql');
var _ = require('lodash');
var housesFromDb = require('../get-houses-from-db.js');
var util = require("util");
/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function (req, res) {
    res.render('api/index', {
        title: 'API Examples'
    });
};





/**
 * GET /api/lob
 * Lob API example.
 */
exports.getLob = function (req, res, next) {
    lob.routes.list({
        zip_codes: ['10007']
    }, function (err, routes) {
        if (err) return next(err);
        res.render('api/lob', {
            title: 'Lob API',
            routes: routes.data[0].routes
        });
    });
};

exports.makeDecision = function (req, res) {
  var User = require('../models/User');
    if (req.user) {
        User.findById(req.user.id, function (err, user) {
            if (err) return console.log(err);
            var id = req.body.id;
            console.log(id);
            if (req.body.decision) {
                user.profile.yesVotes.push(id);
            } else {
                user.profile.noVotes.push(id);
            }
            user.save(function (err) {
                if (err) return console.log(err);
                res.send('Kittens');
            });
        });
    } else {
      console.log('NOT AUTH!');
    }
}
    exports.getHouses = function (req, res, next) {
        var options;
     
            options = {
                minPrice: 100000,
                maxPrice: 200000,
                milesRadius: 5,
                centerZip: 45219,
                minBedrooms: 3,
                minBathrooms: 2,
                alreadyDecided: []
            };

        housesFromDb(options, function (housesCursor) {
            housesCursor.toArray(function (err, houses) {
                if (err) {
                    console.log(err);
                }
                res.send(houses);
            });
        });
    }

    exports.getHouse = function (req, res, next) {
        var user = req.user;
        if (user) {

        }
    }

    exports.getLikedProperties = function (req, res, next) {
        var likedProperties = [];
        var decisions = req.body.yesVotes;

        if (decisions) {
            decisions.forEach(function (value, index, arr) {
                likedProperties.push()
            });
            
            res.send(decisions);
        }
    }

