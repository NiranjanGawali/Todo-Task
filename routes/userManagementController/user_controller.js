var express = require('express');
var router = express.Router();
var user = require('./../userManagementController/user_model').User;
var commonController = require('./../commonFunctionController/common_controller');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../../config');

router.post('/login', async function (req, res, next) {

    let reqBody = req.body;
    req.checkBody('email', 'email is required field!').notEmpty();
    req.checkBody('email', 'Please enter email in valid format!').isEmail();
    req.checkBody('password', 'password is required field!').notEmpty();
    req.checkBody('password', 'Password should have minimum 8 length!').isLength({ min: 8, max: 30 });

    console.log(reqBody);
  
    let errors = await req.validationErrors();
  
    if (errors) {
      return res.status(400).send({ message: await commonController.returnErrorMessage(errors), status: false });
    }

    try {
        let findData ={
            email : reqBody.email.toLowerCase(),
            password: reqBody.password
        }

        user.findOne(findData,function(err,userData){
            if(err){
                console.log(err);
                return res.status(400).send({ err: err, status: false });
            }
            console.log(userData);
            res.status(200).send({ message: 'Login successfulll', status: true, token: createToken(userData), data: userData });
        })
        
    } catch (err) {
        return console.error(err.stack);
    }
    

});

module.exports = router;

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createToken(user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(50, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
  }
  
