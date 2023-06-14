const router = require("express").Router()
const User = require("../models/User")
const Client = require("../models/Client")
const Region = require("../models/Region")
const Product = require("../models/Product")
const Order = require("../models/Order")
const OrderedProduct = require("../models/OrderedProduct")
const CryptoJS = require("crypto-js")

//SET DATA CLIENTS
router.post("/dataclients", async (req, res) => {

    const dataFromApp = req.body.data
    var reutrnStatus

    async function insertData(Element) {
        var status = ""
        const idCheck = await Client.findOne({ appId: Element.id})
        if (idCheck != null) {
            try {
                const updatedClient = await Client.findByIdAndUpdate(idCheck._id, 
                    {
                        appId: Element.id,
                        clientName: Element.client_name,
                        phone: Element.phone,
                        region: Element.region,
                        prices: Element.prices,
                        oldCredit: Element.old_credit,
                        isCredit: Element.is_credit,
                        isFrigo: Element.is_frigo,
                        isPromo: Element.is_promo,
                        creditBon: Element.credit_bon,
                        lastServe: Element.last_serve
                    },
                    { new: true }
                )
                status = "done"
            } catch (err) {
                status = err
            }
        } else {
            const newClient = new Client ({
                appId: Element.id,
                clientName: Element.client_name,
                phone: Element.phone,
                region: Element.region,
                prices: Element.prices,
                oldCredit: Element.old_credit,
                isCredit: Element.is_credit,
                isFrigo: Element.is_frigo,
                isPromo: Element.is_promo,
                creditBon: Element.credit_bon,
                lastServe: Element.last_serve
            })
    
            try{
                const client = await newClient.save()
                status = "done"           
            } catch (err) {
                status = err
            }
        }
        return status
    }

    for (let i = 0; i < dataFromApp.length; i++) {
        const Element = dataFromApp[i]
        reutrnStatus = await insertData(Element)
    }

    if (reutrnStatus == "done") {
        res.status(201).json({
            status: 1,
            message: "Clients data save Successful",
        })
    } else {
        res.status(500).json(reutrnStatus)
    }
    
})

//SET DATA USERS
router.post("/datausers", async (req, res) => {

    const dataFromApp = req.body.data
    var reutrnStatus

    async function insertData(Element) {
        var status = ""
        const idCheck = await User.findOne({ appId: Element.id})
        if (idCheck != null) {
            try {
                const updatedUser = await User.findByIdAndUpdate(idCheck._id, 
                    {
                        appId: Element.id,
                        username: Element.username,
                        email: `${Element.username}@gmail.com`,
                        password: CryptoJS.AES.encrypt(
                            Element.password,
                            process.env.SECRET_KEY
                            ).toString(),
                        profilePic: Element.profilePic,
                        camion: Element.camion,
                        isAdmin: Element.isadmin,
                    },
                    { new: true }
                )
                status = "done"
            } catch (err) {
                status = err
            }
        } else {
            const newUser = new User ({
                appId: Element.id,
                username: Element.username,
                email: `${Element.username}@gmail.com`,
                password: CryptoJS.AES.encrypt(
                    Element.password,
                    process.env.SECRET_KEY
                    ).toString(),
                profilePic: Element.profilePic,
                camion: Element.camion,
                isAdmin: Element.isadmin,
            })
    
            try{
                const user = await newUser.save()
                status = "done"           
            } catch (err) {
                status = err
            }
        }
        return status
    }

    for (let i = 0; i < dataFromApp.length; i++) {
        const Element = dataFromApp[i]
        reutrnStatus = await insertData(Element)
    }

    if (reutrnStatus == "done") {
        res.status(201).json({
            status: 1,
            message: "Users data save Successful",
        })
    } else {
        res.status(500).json(reutrnStatus)
    }
    
})

//SET DATA REGIONS
router.post("/dataregions", async (req, res) => {

    const dataFromApp = req.body.data
    var reutrnStatus

    async function insertData(Element) {
        var status = ""
        const idCheck = await Region.findOne({ appId: Element.id})
        if (idCheck != null) {
            try {
                const updatedRegion = await Region.findByIdAndUpdate(idCheck._id, 
                    {
                        appId: Element.id,
                        regionName: Element.region_name
                    },
                    { new: true }
                )
                status = "done"
            } catch (err) {
                status = err
            }
        } else {
            const newRegion = new Region ({
                appId: Element.id,
                regionName: Element.region_name
            })
    
            try{
                const region = await newRegion.save()
                status = "done"           
            } catch (err) {
                status = err
            }
        }
        return status
    }

    for (let i = 0; i < dataFromApp.length; i++) {
        const Element = dataFromApp[i]
        reutrnStatus = await insertData(Element)
    }

    if (reutrnStatus == "done") {
        res.status(201).json({
            status: 1,
            message: "Regions data save Successful",
        })
    } else {
        res.status(500).json(reutrnStatus)
    }
    
})

//SET DATA PRODUCTS
router.post("/dataproducts", async (req, res) => {

    const dataFromApp = req.body.data
    var reutrnStatus

    async function insertData(Element) {
        var status = ""
        const idCheck = await Product.findOne({ appId: Element.id})
        if (idCheck != null) {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(idCheck._id, 
                    {
                        appId: Element.id,
                        name: Element.name,
                        price: Element.price,
                        qty_par_one: Element.qty_par_one,
                        image: Element.image,
                        status: Element.status
                    },
                    { new: true }
                )
                status = "done"
            } catch (err) {
                status = err
            }
        } else {
            const newProduct = new Product ({
                appId: Element.id,
                name: Element.name,
                price: Element.price,
                qty_par_one: Element.qty_par_one,
                image: Element.image,
                status: Element.status
            })
    
            try{
                const product = await newProduct.save()
                status = "done"           
            } catch (err) {
                status = err
            }
        }
        return status
    }

    for (let i = 0; i < dataFromApp.length; i++) {
        const Element = dataFromApp[i]
        reutrnStatus = await insertData(Element)
    }

    if (reutrnStatus == "done") {
        res.status(201).json({
            status: 1,
            message: "Products data save Successful",
        })
    } else {
        res.status(500).json(reutrnStatus)
    }
    
})

//SET DATA ORDERS
router.post("/dataorders", async (req, res) => {

    const dataFromApp = req.body.data
    var reutrnStatus

    async function insertData(Element) {
        var status = ""
        const idCheck = await Order.findOne({ appId: Element.id})
        if (idCheck != null) {
            try {
                const updatedOrder = await Order.findByIdAndUpdate(idCheck._id, 
                    {
                        appId: Element.id,
                        clientName: Element.client_name,
                        clientId: Element.client_id,
                        productListId: Element.product_list_id,
                        totalToPay: Element.total_to_pay,
                        verssi: Element.verssi,
                        rest: Element.rest,
                        date: Element.date,
                        isCredit: Element.iscredit,
                        isCheck: Element.is_check
                    },
                    { new: true }
                )
                status = "done"
            } catch (err) {
                status = err
            }
        } else {
            const newOrder = new Order ({
                appId: Element.id,
                clientName: Element.client_name,
                clientId: Element.client_id,
                productListId: Element.product_list_id,
                totalToPay: Element.total_to_pay,
                verssi: Element.verssi,
                rest: Element.rest,
                date: Element.date,
                isCredit: Element.iscredit,
                isCheck: Element.is_check
            })

            try{
                const order = await newOrder.save()
                status = "done"           
            } catch (err) {
                status = err
            }
        }
        return status
    }

    for (let i = 0; i < dataFromApp.length; i++) {
        const Element = dataFromApp[i]
        reutrnStatus = await insertData(Element)
    }

    if (reutrnStatus == "done") {
        res.status(201).json({
            status: 1,
            message: "Orders data save Successful",
        })
    } else {
        res.status(500).json(reutrnStatus)
    }
    
})

//SET DATA ORDER_PRODUCTS
router.post("/dataorderproducts", async (req, res) => {

    const dataFromApp = req.body.data
    var reutrnStatus

    async function insertData(Element) {
        var status = ""
        const idCheck = await OrderedProduct.findOne({ appId: Element.id})
        if (idCheck != null) {
            try {
                const updatedOrderedProduct = await OrderedProduct.findByIdAndUpdate(idCheck._id, 
                    {
                        appId: Element.id,
                        orderId: Element.orderId,
                        mini_qty: Element.mini_qty,
                        mini_q_u: Element.mini_q_u,
                        solo_qty: Element.solo_qty,
                        solo_q_u: Element.solo_q_u,
                        pot_qty: Element.pot_qty,
                        pot_q_u: Element.pot_q_u,
                        gini_qty: Element.gini_qty,
                        gini_q_u: Element.gini_q_u,
                        big_qty: Element.big_qty,
                        big_q_u: Element.big_q_u,
                        cornito_4_qty: Element.cornito_4_qty,
                        cornito_4_q_u: Element.cornito_4_q_u,
                        cornito_5_qty: Element.cornito_5_qty,
                        cornito_5_q_u: Element.cornito_5_q_u,
                        cornito_g_qty: Element.cornito_g_qty,
                        cornito_g_q_u: Element.cornito_g_q_u,
                        gofrito_qty: Element.gofrito_qty,
                        gofrito_q_u: Element.gofrito_q_u,
                        pot_v_qty: Element.pot_v_qty,
                        pot_v_q_u: Element.pot_v_q_u,
                        g8_qty: Element.g8_qty,
                        g8_q_u: Element.g8_q_u,
                        gold_qty: Element.gold_qty,
                        gold_q_u: Element.gold_q_u,
                        skiper_qty: Element.skiper_qty,
                        skiper_q_u: Element.skiper_q_u,
                        scobido_qty: Element.scobido_qty,
                        scobido_q_u: Element.scobido_q_u,
                        mini_scobido_qty: Element.mini_scobido_qty,
                        mini_scobido_q_u: Element.mini_scobido_q_u,
                        venezia_qty: Element.venezia_qty,
                        venezia_q_u: Element.venezia_q_u,
                        bf_400_q_u: Element.bf_400_q_u,
                        bf_250_q_u: Element.bf_250_q_u,
                        bf_230_q_u: Element.bf_230_q_u,
                        bf_200_q_u: Element.bf_200_q_u,
                        bf_150_q_u: Element.bf_150_q_u,
                        buch_q_u: Element.buch_q_u,
                        tarte_q_u: Element.tarte_q_u,
                        mosta_q_u: Element.mosta_q_u,
                        misso_q_u: Element.misso_q_u,
                        juliana_q_u: Element.juliana_q_u,
                        bac_5_q_u: Element.bac_5_q_u,
                        bac_6_q_u: Element.bac_6_q_u
                    },
                    { new: true }
                )
                status = "done"
            } catch (err) {
                status = err
            }
        } else {
            const newOrderedProduct = new OrderedProduct ({
                appId: Element.id,
                orderId: Element.orderId,
                mini_qty: Element.mini_qty,
                mini_q_u: Element.mini_q_u,
                solo_qty: Element.solo_qty,
                solo_q_u: Element.solo_q_u,
                pot_qty: Element.pot_qty,
                pot_q_u: Element.pot_q_u,
                gini_qty: Element.gini_qty,
                gini_q_u: Element.gini_q_u,
                big_qty: Element.big_qty,
                big_q_u: Element.big_q_u,
                cornito_4_qty: Element.cornito_4_qty,
                cornito_4_q_u: Element.cornito_4_q_u,
                cornito_5_qty: Element.cornito_5_qty,
                cornito_5_q_u: Element.cornito_5_q_u,
                cornito_g_qty: Element.cornito_g_qty,
                cornito_g_q_u: Element.cornito_g_q_u,
                gofrito_qty: Element.gofrito_qty,
                gofrito_q_u: Element.gofrito_q_u,
                pot_v_qty: Element.pot_v_qty,
                pot_v_q_u: Element.pot_v_q_u,
                g8_qty: Element.g8_qty,
                g8_q_u: Element.g8_q_u,
                gold_qty: Element.gold_qty,
                gold_q_u: Element.gold_q_u,
                skiper_qty: Element.skiper_qty,
                skiper_q_u: Element.skiper_q_u,
                scobido_qty: Element.scobido_qty,
                scobido_q_u: Element.scobido_q_u,
                mini_scobido_qty: Element.mini_scobido_qty,
                mini_scobido_q_u: Element.mini_scobido_q_u,
                venezia_qty: Element.venezia_qty,
                venezia_q_u: Element.venezia_q_u,
                bf_400_q_u: Element.bf_400_q_u,
                bf_250_q_u: Element.bf_250_q_u,
                bf_230_q_u: Element.bf_230_q_u,
                bf_200_q_u: Element.bf_200_q_u,
                bf_150_q_u: Element.bf_150_q_u,
                buch_q_u: Element.buch_q_u,
                tarte_q_u: Element.tarte_q_u,
                mosta_q_u: Element.mosta_q_u,
                misso_q_u: Element.misso_q_u,
                juliana_q_u: Element.juliana_q_u,
                bac_5_q_u: Element.bac_5_q_u,
                bac_6_q_u: Element.bac_6_q_u
            })
    
            try{
                const orderedProduct = await newOrderedProduct.save()
                status = "done"           
            } catch (err) {
                status = err
            }
        }
        return status
    }

    for (let i = 0; i < dataFromApp.length; i++) {
        const Element = dataFromApp[i]
        reutrnStatus = await insertData(Element)
    }

    if (reutrnStatus == "done") {
        res.status(201).json({
            status: 1,
            message: "Ordered Products data save Successful",
        })
    } else {
        res.status(500).json(reutrnStatus)
    }
    
})

module.exports = router