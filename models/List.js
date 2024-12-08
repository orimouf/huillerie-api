const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema(
    {
        date: { type: String, required: true, unique: true },
        timeArray: { type: Array, required: true },
        status: { type: String, default: "Vide" }
    },
    {timestamps: true}
)

module.exports = mongoose.model("List", ListSchema)