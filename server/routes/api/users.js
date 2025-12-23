const express = require("express");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/key");
const passport = require("passport");

const router = express.Router();

// 注册接口
router.post('/register', (req, res) => {
  // 查找邮箱是否被注册
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.json({ 
        code: 0,
        msg: "邮箱已被占用" });
    } else {
      // 注册新账号
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar: avatar,
        identity: req.body.identity
      });
      // 对密码进行加密处理
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          // 存储到数据库
          newUser.save().then((user) => {
            res.json({
              code: 1,
              data: user
            });
          }).catch((err) => {
            console.log(err);
          })
        });
      });
    }
  }).catch((err) => {
    console.log(err);
  });
});

// 登录接口
router.post('/login', (req, res) => {
  const { password, email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({ 
        code: 0,
        msg: '当前用户不存在'
       });
    } else {
      // 密码匹配
      bcrypt.compare(password, user.password).then((isMatched) => {
        if (isMatched) {
          // 返回token
          const rule = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            identity: user.identity
          };
          jwt.sign(rule, secret, { expiresIn: 3600 * 24 * 7 }, (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({
                code:1,
                success: true,
                token: 'Bearer ' + token
              });
            }
          });
        } else {
          return res.json({ 
            code: 0,
            msg: "密码错误" });
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }).catch((err) => {
    console.log(err);
  })
});


module.exports = router;