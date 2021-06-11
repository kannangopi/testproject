const express = require("express");
let router = express.Router();
const db = require("../db/schema");
const bcrypt = require("bcrypt");
const saltnumber = 10;
const mongoose = require("mongoose");
const chatRoom = require("../db/userschema");
const chatroom = require("../db/userschema");
//                                          //handle register
router.post("/register", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  //                                                       // saving username and password  using hash
  bcrypt.hash(req.body.password, saltnumber, (err, hash) => {
    if (err) console.log(err);
    else {
      const tableData = new db({
        username: req.body.username,
        password: hash,
      });
      tableData.save((err, reslt) => {
        if (err) console.log(err);
        else {
          console.log(reslt);
          // mongoose.model(req.body.username, chatroom);
        }
      });
    }
  });
});

router.put("/login", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);

  let user = { username: req.body.username };
  db.find(user, (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (error, reslt) => {
        if (error) res.send(err);
        else {
          console.log(result);
          res.send(reslt);
        }
      });
      // res.send(result);
    } else {
      console.log(err);
    }
  });
});
router.get("/user", (req, res) => {
  db.find({}, { username: 1, _id: 1 }, (err, resp) => {
    if (err) res.send(err);
    else res.send(resp);
  });
});
module.exports = router;
