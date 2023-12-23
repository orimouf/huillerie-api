const mongoose = require("mongoose")

const UniqueIdSchema = new mongoose.Schema(
    {
        appId: { type: String, required: true, unique: false },
        clientServerId: { type: String, required: true, unique: true },
        UniqueId: { type: String, required: true, unique: true }
    },
    {timestamps: true}
)

module.exports = mongoose.model("UniqueId", UniqueIdSchema)