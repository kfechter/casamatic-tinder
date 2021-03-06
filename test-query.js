﻿var housesFromDb = require('./get-houses-from-db.js');

var options = {
    minPrice: 100000,
    maxPrice: 200000,
    milesRadius: 1,
    centerZip: 45219,
    minBedrooms: 3,
    minBathrooms: 2
};

housesFromDb(options, function (housesCursor) {
    var houses = housesCursor.toArray(function (err, houses){
        houses.forEach(function (house) {
            console.log(house.ListingKey);
        });
        console.log(houses.length);
    });
});
