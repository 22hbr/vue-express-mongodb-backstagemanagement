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

const formatToLocalTime = (isoStr) => {
  const d = new Date(isoStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// // 查询全部资金流水接口
// router.get('/search', passport.authenticate("jwt", { session: false }), (req, res) => {
//   const { startDate, endDate, pageNum = 1, pageSize = 10 } = req.query;
//   const query = {};
//   if (startDate && endDate) {
//     query.date = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate)
//     };
//   }
//   const pageNumInt = parseInt(pageNum);
//   const pageSizeInt = parseInt(pageSize);


//   Profile
//     .find(query)
//     .skip((pageNumInt - 1) * pageSizeInt)
//     .limit(pageSizeInt)
//     .lean()
//     .then((profiles) => {
//       profiles.forEach(profile => {
//         profile.date = formatToLocalTime(profile.date);
//       });
//       res.json({
//         code: 1,
//         data: profiles,
//         total:profiles.length
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ code: 0, msg: '查询失败' });
//     });
// });

// 查询全部资金流水接口（包含总数）
router.get('/search', passport.authenticate("jwt", { session: false }), (req, res) => {
  const { startDate, endDate, pageNum = 1, pageSize = 10 } = req.query;
  const query = {};
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  const pageNumInt = parseInt(pageNum, 10);
  const pageSizeInt = parseInt(pageSize, 10);

  // 并行执行：查总数 + 查当前页数据
  Promise.all([
    Profile.countDocuments(query), // 总记录数
    Profile.find(query)
      .skip((pageNumInt - 1) * pageSizeInt)
      .limit(pageSizeInt)
      .lean()
  ])
    .then(([total, profiles]) => {
      // 格式化日期
      const formattedProfiles = profiles.map(profile => ({
        ...profile,
        date: formatToLocalTime(profile.date)
      }));

      res.json({
        code: 1,
        data: formattedProfiles,
        total, // ✅ 这是真实的总条数，不受 pageSize 影响
        pageNum: pageNumInt,
        pageSize: pageSizeInt,
        totalPages: Math.ceil(total / pageSizeInt)
      });
    })
    .catch((err) => {
      console.error('查询资金流水失败:', err);
      res.status(500).json({ code: 0, msg: '查询失败' });
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