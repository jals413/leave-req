const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
        topic: {
            type: String,
            required: true,
            unique: true,
        },
        aprooved_by: {
            type: [String],
            default: null
        },
        status: {
            type: String,
            default: "Processing"
        },
        body: {
            type: String,
            required: true,
        },
        notes:{
            type:String,
        },
        requestor: {
            type: String,
        },
        // New fields for file upload
        file: {
            data: Buffer, // Binary file data
            filename: String, // Original filename
            mimetype: String, // Mime type of the file
        }
    },
    {
        timestamps: true, // Corrected typo in the option name
    }
);

const Form = mongoose.models.Form || mongoose.model('Form', formSchema);
module.exports = Form;