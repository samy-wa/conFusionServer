const  express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Promos= require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(function (req, res, next) {
        Promos.find({})
            .then((promos) =>{
                res.statusCode= 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => { 
        Promos.create(req.body)
        .then((promo) => {
            console.log('Dish Created ', promo);
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req,res,next) => {
        res.statusCode=403;
        res.end('Put operation not supported on /promoes');
    })
    .delete(authenticate.verifyUser, (req,res,next) => {
        Promos.remove({})
        .then((resp) => {
            res.statusCode=201;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err))
    });

promoRouter.route('/:promoId')
    .get(function (req, res, next) {
        Promos.findById(req.params.promoId)
            .then((promos) =>{
                res.statusCode= 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req,res,next) => { 
        res.statusCode=403;
        res.end('Pos operation not supported on /promotions ' + req.params.promoId);
    })
    .put(authenticate.verifyUser, (req,res,next) => {
        Promos.findByIdAndUpdate(req.params.promoId,{
            $set: req.body
        }, { new: true})
        .then((promo) =>{
            res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req,res,next) => {
        Promos.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode=201;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err))
    });

module.exports = promoRouter;