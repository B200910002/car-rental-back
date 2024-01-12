const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    numberPlate: {
        type: String,
        required: true,
    },
    mark: {
        type: String,
        required: true,
    },
    factory: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    insurance: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = {
    Vehicle: mongoose.model("Vehicle", vehicleSchema),
    vehicleSchema
}