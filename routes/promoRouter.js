const  express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send all the promoes to you!');
})
.post((req,res,next) => { 
    res.end('Will add the promo: '+ req.body.name + 
    ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end('Put operation not supported on /promoes');
})
.delete((req,res,next) => {
    res.end('Deleting all the promoesh!');
});

promoRouter.get('/:promoId',(req,res,next) =>{
    res.end('Will send details of the promo: ' +
    + req.params.promoId + ' to you!');
})
.post('/:promoId',(req,res,next) => { 
    res.statusCode=403;
    res.end('POST operation not supported on /promoes/: ' + 
    req.params.promoId);
})
.put('/:promoId',(req,res,next) => {
    res.write('updating the promo: ' + req.params.promoId + '\n');
    res.end('will update the promo: '+ req.body.name + ' with details ' +
    req.body.description);
})
.delete('/:promoId',(req,res,next) => {
    res.end('Deleting promo: ' + req.params.promoId);
});

module.exports = promoRouter;