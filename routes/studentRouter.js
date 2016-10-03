var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Students = require('../models/students');

var studentRouter = express.Router();
studentRouter.use(bodyParser.json());

studentRouter.route('/')
    .get(function(req, res, next) {
        Students.find({})
            .exec(function (err, student) {
            if (err) next(err);
            res.json(student);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Students.create(req.body, function(err, student) {
            if (err) next(err);
            console.log('Student created!');
            var id = student._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the student with id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Students.remove({}, function(err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });

studentRouter.route('/:studentId')
    .get(function(req, res, next) {
        Students.findById(req.params.studentId, function(err, student) {
            if (err) next(err);
            res.json(student);
        });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Students.findByIdAndUpdate(req.params.studentId, {
            $set: req.body
        }, {
            new: true
        }, function(err, student) {
            if (err) next(err);
            res.json(student);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Students.findByIdAndRemove(req.params.studentId, function(err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });

module.exports = studentRouter;
