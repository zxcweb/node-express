const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    type:{
        type:String,
    },
    descirbe:{
        type:String,
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// module.exports = mongoose.model("User", Last_AisFusion_wenFusion);
module.exports = mongoose.model("Profile", ProfileSchema);

