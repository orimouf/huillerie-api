const mongoose = require("mongoose")

const OrderedProductSchema = new mongoose.Schema(
    {
        appId: { type: String, required: true, unique: true },
        orderId: { type: String, required: true },
        mini_qty: { type: String, required: true },
        mini_q_u: { type: String, required: true },
        solo_qty: { type: String, required: true },
        solo_q_u: { type: String, required: true },
        pot_qty: { type: String, required: true },
        pot_q_u: { type: String, required: true },
        gini_qty: { type: String, required: true },
        gini_q_u: { type: String, required: true },
        big_qty: { type: String, required: true },
        big_q_u: { type: String, required: true },
        cornito_4_qty: { type: String, required: true },
        cornito_4_q_u: { type: String, required: true },
        cornito_5_qty: { type: String, required: true },
        cornito_5_q_u: { type: String, required: true },
        cornito_g_qty: { type: String, required: true },
        cornito_g_q_u: { type: String, required: true },
        gofrito_qty: { type: String, required: true },
        gofrito_q_u: { type: String, required: true },
        pot_v_qty: { type: String, required: true },
        pot_v_q_u: { type: String, required: true },
        g8_qty: { type: String, required: true },
        g8_q_u: { type: String, required: true },
        gold_qty: { type: String, required: true },
        gold_q_u: { type: String, required: true },
        skiper_qty: { type: String, required: true },
        skiper_q_u: { type: String, required: true },
        scobido_qty: { type: String, required: true },
        scobido_q_u: { type: String, required: true },
        mini_scobido_qty: { type: String, required: true },
        mini_scobido_q_u: { type: String, required: true },
        venezia_qty: { type: String, required: true },
        venezia_q_u: { type: String, required: true },
        bf_400_q_u: { type: String, required: true },
        bf_250_q_u: { type: String, required: true },
        bf_230_q_u: { type: String, required: true },
        bf_200_q_u: { type: String, required: true },
        bf_150_q_u: { type: String, required: true },
        buch_q_u: { type: String, required: true },
        tarte_q_u: { type: String, required: true },
        mosta_q_u: { type: String, required: true },
        misso_q_u: { type: String, required: true },
        juliana_q_u: { type: String, required: true },
        bac_5_q_u: { type: String, required: true },
        bac_6_q_u: { type: String, required: true }
        
    },
    {timestamps: true}
)

module.exports = mongoose.model("OrderedProduct", OrderedProductSchema)