'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* eslint new-cap: 0 */
const photoSchema = new Schema({
    url: String,
    geoPosition: {
        lat: Number,
        lng: Number
    },
    comments: [
        {
            comment: String
        }
    ]
});

module.exports = mongoose.model('photo', photoSchema);
