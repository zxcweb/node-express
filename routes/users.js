var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys').secretOrKey;
const Users = require('../models/Users');

// @route  POST api/users/register
// @desc   返回用户信息
// @access public
router.post('/register', (req, res) => {
    Users.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.json("邮箱已存在")
            } else {
                const newUser = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    identity: req.body.identity
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json({
                                name: user.name,
                                email: user.email,
                                identity: user.identity
                            }))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});

// @route  POST api/users/login
// @desc   返回的请求的json数据
// @access public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    Users.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json('用户不存在')
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            identity: user.identity
                        };
                        jwt.sign(rule, keys, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                        // res.json({msg:"success"});
                    } else {
                        return res.status(400).json('密码错误!');
                    }
                });

        })
})

// #route GET api/users/current
// @desc return current user
// @access Private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
      });
})

module.exports = router;

