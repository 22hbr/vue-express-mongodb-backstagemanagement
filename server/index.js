const express = require('express');
const mongoose = require('mongoose');
const users = require("./routes/api/users");

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/users',users);

mongoose.connect('mongodb://localhost:27017/backstagemanagement')
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log('connected error:',err);
})

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});