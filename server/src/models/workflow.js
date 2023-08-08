const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workFlowSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        approver:{
            type:[String],
            required:true,
        },
        created_by:{
            type:String
        },
        approvalType:{
            type:Number,
            required:true,
            default:0
        }
    },
    {
        timestamps: true,
    }
);

const WorkFLow = mongoose.models.WorkFLow || mongoose.model('WorkFLow', workFlowSchema);
module.exports = WorkFLow;
