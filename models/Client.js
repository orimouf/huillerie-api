const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema(
    {
        uniqueId: { type: String, required: true, unique: true },
        clientName: { type: String, required: true },
        phone: { type: String, required: true },
        nbrSacs: { type: String, required: true },
        nbrBuckets: { type: String, required: true },
        weight: { type: String, required: true },
        liters: { type: String, required: true },
        litersIn100Kg: { type: String, required: true },
        arrivalDate: { type: String, required: true },
        entryDate: { type: String, required: true },
        entryTime: { type: String, required: true },
        totalPrice: { type: String, required: true },
        paymentPrice: { type: String, required: true },
        restPrice: { type: String, required: true },
        paymentStatus: { type: Boolean, default: false },
        status: { type: String, default: "Ne Passe Pas" },
        buckets5L: { type: String, required: true },
        otherBuckets: { type: String, required: true }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Client", ClientSchema)