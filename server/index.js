// 导入
const express = require('express');
const mongoose = require('mongoose');
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const bodyParser = require('body-parser');
const passport = require("passport");

const app = express();
const port = process.env.PORT || 3000;

// 使用body-parse中间件
// 先使用中间件载导入路由，否则无法解析
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);
// 使用路由
app.use('/api/users',users);
app.use('/api/profiles',profiles);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/backstagemanagement')
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log('connected error:',err);
})

// 监听端口
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});