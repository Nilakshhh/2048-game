const router = require('express').Router();
let User = require('../models/user.model');

const validateRegisterInput = require("../validation/register.js");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then(user => {
    if(user){
      return res.status(400).json({ password : "Username already exists" });
    } else {
      const username = req.body.username;
      const password = req.body.password;
      const highscore = req.body.highscore;

      const newUser = new User({username, password, highscore});

      newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  })
});

module.exports = router;