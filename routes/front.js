var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index');
  });
  
  router.get('/login', function (req, res) {
    res.render('login')
  });
  
  /* GET users listing. */
  router.get('/users', function (req, res, next) {
    res.render('users');
  });
  
  router.get('/newUser', function (req, res, next) {
    res.render('newUser');
  })
  
  router.get('/editUser/:id?', function (req, res) {
    res.render('editUser');
  })
  
  module.exports = router;