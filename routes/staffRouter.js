var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Staffs = require('../models/staffs');

var staffRouter = express.Router();
staffRouter.use(bodyParser.json());

staffRouter.route('/')
    .get(function(req, res, next) {
        Staffs.find({}, function(err, staff) {
            if (err) next(err);
            res.json(staff);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Staffs.create(req.body, function(err, staff) {
            if (err) next(err);
            console.log('Staff created!');
            var id = staff._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the staff with the id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Staffs.remove({}, function(err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });

staffRouter.route('/:staffId')
    .get(function(req, res, next) {
        Staffs.findById(req.params.staffId, function(err, staff) {
            if (err) next(err);
            res.json(staff);
        });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Staffs.findByIdAndUpdate(req.params.staffId, {
            $set: req.body
        }, {
            new: true
        }, function(err, staff) {
            if (err) next(err);
            res.json(staff);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Staffs.findByIdAndRemove(req.params.staffId, function(err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });

module.exports = staffRouter
