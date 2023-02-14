var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    id:{
        type:Number
        //required:true
    },
    game:{
        type:String
        //required:true
    },
    desc:{
        type:String
        //required:true
    },
    status:{
        type:String
    }
});

mongoose.model("game", Schema);