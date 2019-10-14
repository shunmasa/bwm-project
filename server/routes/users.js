const express = require('express');
const router = express.Router();
const User = require('../controllers/user')
//register post//id
router.post('/auth', User.auth);
//specify the id  //find by Id
router.post('/register',User.register)



module.exports = router;

