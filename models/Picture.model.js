const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    picName: {
        type: String,
        required: true,
    },
    picUrl: {
        type: String,
        required: true,
    },
    picSize: {
        type: String,
        required: true,
    },
    picDescription: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = {
    Picture: mongoose.model("Picture", pictureSchema),
    pictureSchema
}