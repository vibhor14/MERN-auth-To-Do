const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./userDB");
require('dotenv').config();
 
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true,
    })
); 
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//------------------connecting to DB -------------------------------------------------------//
let password = process.env.MONGODB_PASSWORD;
mongoose.connect("mongodb+srv://admin-vibhor:"+process.env.MONGODB_PASSWORD+"@cluster0.4glif.mongodb.net/project1DB?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
});
//-----------------------------------------------------------------------------------------

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}))



//----------------------------------------------------------------------------------------------
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
app.post("/register", (req, res) => {
  console.log("reached here");
  User.findOne({ username: req.body.userEmail }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
      const newUser = new User({
        name: req.body.userName,
        username: req.body.userEmail,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
}); 
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(false);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        var redir = { redirect: "/secret" };
        // return res.json(redir);
        res.send(user); 
      });
    }
  })(req, res, next);
});
app.get("/logout", (req,res)=> {
  req.logout();
  var logoutRedir = {redirect: "/"};
  res.send(logoutRedir);
})
app.post("/addtask", (req,res)=> {
  let typeofList = req.body.typeOfList;
  console.log(typeofList);
  User.findOneAndUpdate({_id: req.body.userID},{$push:{[ typeofList ]: req.body.task}}, function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("successfully added new task");
    }
  });
})
app.delete("/delete",(req,res)=> {
  let typeofList = req.body.typeOfList;
  User.findOneAndUpdate({_id: req.body.userID},{$pull:{[ typeofList ]: req.body.task}}, function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("successfully deleted");
    }
  });
})
app.listen(process.env.PORT || 4000, () => {
    console.log("Server Has Started on port 4000");
});
