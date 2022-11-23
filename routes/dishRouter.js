const  express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(function (req, res, next) {
        Dishes.find({})
            .then((dishes) =>{
                res.statusCode= 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Dishes.create(req.body)
        .then((dish) => {
            console.log('Dish Created ', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(function (req, res, next) {
        res.statusCode=403;
        res.end('Put operation not supported on /dishes');
    })
    .delete(function (req, res, next) {
        Dishes.remove({})
        .then((resp) => {
            res.statusCode=201;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err))
    });

dishRouter.route('/:dishId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId)
        .then((dishes) =>{
            res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .post(function (req, res, next) {
        res.statusCode=403;
        res.end('Pos operation not supported on /dishes ' + req.params.dishId);
    })
    .put(function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.dishId,{
            $set: req.body
        }, { new: true})
        .then((dishes) =>{
            res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .delete(function (req, res, next) {
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statusCode=201;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err))
    });
module.exports = dishRouter;