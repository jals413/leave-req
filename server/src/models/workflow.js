const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workFlowSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        aproover:{
            type:[String],
            required:true,
        },
        created_by:{
            type:String
        }
    },
    {
        timestamps: true,
    }
);

const Form = mongoose.models.Form || mongoose.model('Form', workFlowSchema);
module.exports = Form;
