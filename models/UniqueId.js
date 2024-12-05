const mongoose = require("mongoose")

const UniqueIdSchema = new mongoose.Schema(
    {
        idName: { type: String, required: true, unique: true },
        uniqueId: { type: Number, required: true, unique: true }
    },
    {timestamps: true}
)

module.exports = mongoose.model("UniqueId", UniqueIdSchema)