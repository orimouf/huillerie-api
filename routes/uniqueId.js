const router = require("express").Router()
const UniqueId = require("../models/UniqueId")
const CryptoJS = require("crypto-js")
const verify = require("../verifyToken")

//UPDATE

// router.put("/:id", verify, async (req, res) => {
//     if(req.user.id === req.params.id || req.user.isAdmin) {
//         if(req.body.password){
//             req.body.password = CryptoJS.AES.encrypt(
//                     req.body.password,
//                     process.env.SECRET_KEY
//                 ).toString()
//         }
//         try {
//             const updatedUniqueId = await UniqueId.findByIdAndUpdate(req.params.id, 
//                 {
//                     $set:req.body,
//                 },
//                 { new: true }
//             )
//             res.status(200).json(updatedUniqueId)
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     } else {
//         res.status(500).json("you can update only your account!")
//     }
// })

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await UniqueId.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted...")
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
        const UniqueId = await UniqueId.findByIdAndDelete(req.params.id)
        const { password, ...info } = UniqueId._doc

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
            const UniqueIds = query ? await UniqueId.find().sort({_id: -1}).limit(10) : await UniqueId.find()
            res.status(200).json({ UniqueIds })
        } catch (err) {
            res.status(500).json(err)
        }
    // } else {
    //     res.status(500).json("you are not allowed to see all users!")
    // }
})

//GET LAST ONE

router.get("/last/", async (req, res) => {
    const query = req.query.new
    // if(req.user.isAdmin) {
        try {
            const UniqueIds = query ? await UniqueId.find().sort({_id: -1}).limit(10) : await UniqueId.find()
            let lastOne = (UniqueIds.length > 0) ? UniqueIds[UniqueIds.length - 1] : "Data Empty"

            res.status(200).json( lastOne.UniqueId )
        } catch (err) {
            res.status(500).json(err)
        }
    // } else {
    //     res.status(500).json("you are not allowed to see all users!")
    // }
})

module.exports = router