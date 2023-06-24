const router = require("express").Router()
const Client = require("../models/Client")
const CryptoJS = require("crypto-js")
const verify = require("../verifyToken")

//UPDATE

router.put("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.SECRET_KEY
                ).toString()
        }
        try {
            const updatedClient = await Client.findByIdAndUpdate(req.params.id, 
                {
                    $set:req.body,
                },
                { new: true }
            )
            res.status(200).json(updatedClient)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you can update only your account!")
    }
})

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await Client.findByIdAndDelete(req.params.id)
            res.status(200).json("Client has been deleted...")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you can delete only your account!")
    }
})

//GET

router.get("/find/:id", async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id)
        const { password, ...info } = client._doc

        res.status(200).json(info)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get("/", async (req, res) => {
    const query = req.query.new
    // if(req.user.isAdmin) {
        try {
            const clients = query ? await Client.find().sort({_id: -1}).limit(10) : await Client.find()
            res.status(200).json({ clients })
        } catch (err) {
            res.status(500).json(err)
        }
    // } else {
    //     res.status(500).json("you are not allowed to see all clients!")
    // }
})

//GET USER STATS
router.get("/stats", async (req, res) => {
    const today = new Date()
    const lastYear = today.setFullYear(today.setFullYear() - 1)

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    try {
        const data = await Client.aggregate([
            {
                $project:{
                    month: {$month: "$createdAt"} // or $year
                }
            },{
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router