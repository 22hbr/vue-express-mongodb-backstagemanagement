const express = require("express");
const Profile = require("../../models/Profile");
const passport = require("passport");
const router = express.Router();

// 权限测试接口-token
router.get('/test', (req, res) => {
  res.json({
    msg: "profiles test"
  });
});

// 查询全部资金流水接口
router.get('/search', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.find().then((profiles) => {
    res.json({
      code: 1,
      data: profiles
    });
  }).catch((err) => {
    console.log(err);
  });
});

// 查询单个资金流水接口
router.get('/search/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id }).then((profile) => {
    res.json({
      code: 1,
      data: profile
    });
  }).catch((err) => {
    console.log(err);
  });
});

// 新增资金流水接口
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileFields = {};
  if (req.body.type) { profileFields.type = req.body.type };
  if (req.body.description) { profileFields.description = req.body.description };
  if (req.body.income) { profileFields.income = req.body.income };
  if (req.body.expend) { profileFields.expend = req.body.expend };
  if (req.body.cash) { profileFields.cash = req.body.cash };
  if (req.body.remark) { profileFields.remark = req.body.remark };

  new Profile(profileFields).save().then(profile => {
    res.json({
      code: 1,
      data: profile
    });
  }).catch(err => {
    console.log(err);
  });

});

// 编辑资金流水接口
router.post('/update/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileFields = {};
  if (req.body.type) { profileFields.type = req.body.type };
  if (req.body.description) { profileFields.description = req.body.description };
  if (req.body.income) { profileFields.income = req.body.income };
  if (req.body.expend) { profileFields.expend = req.body.expend };
  if (req.body.cash) { profileFields.cash = req.body.cash };
  if (req.body.remark) { profileFields.remark = req.body.remark };

  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true }
  ).then((profile) => {
    res.json({
      code: 1,
      data: profile
    });
  }).catch((err) => {
    console.log(err);
  });

});

// 删除资金流水接口
router.delete('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndDelete(
    { _id: req.params.id }
  ).then((profile) => {
    if (!profile) {
      return res.status(404).json({
        code: 0,
        msg: "当前流水不存在"
      });
    }
    res.json({
      code: 1,
      data: profile
    });
  }).catch((err) => {
    console.log(err);
  });

});

module.exports = router;