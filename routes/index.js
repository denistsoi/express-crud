const router = require('express').Router();
const db = require('mongoose').connection;

router.get('/', (req, res, next)=>{
  let cursor = db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index', { quotes: result });
  });
});

router.post('/quotes', (req, res, next) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to db');
    res.redirect('/');
  })
})

module.exports = router;