var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;

var db = require("./config/database");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/', {
    useNewUrlParser:true,useUnifiedTopology:true
});

require("./models/Game");
var Game = mongoose.model("game");

//example routes
app.get("/", function(req, res){
    //res.send("Hello!");
    res.redirect("gameList.html")
});

app.post("/saveGame", function(req, res){
    console.log(req.body);

    new Game(req.body).save().then(function(){
        //res.send(req.body);
        //res.redirect("index.html");
        res.redirect("gameList.html");
    });
});

app.get("/getGames", function(req, res){
    Game.find({}).then(function(game){
        //console.log({game});
        res.json({game});
    });
});

app.post("/deleteGame", function(req, res){
    console.log(`Game Deleted! ${req.body.game}`)
    Game.findByIdAndDelete(req.body.game).exec();
});

app.get("/getID::id", function(req, res){
    res.redirect("updatePage.html?id=" + req.params.id);
    console.log(req.body.game._id);
});

//update route
app.post("/updateGame", function(req, res){
    console.log(req.body);
    //res.redirect("gameList.html");
    Game.findByIdAndUpdate(req.body.id, {status:req.body.status}, function(){
        res.redirect("gameList.html");
    });
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on Port ${port}`);
});