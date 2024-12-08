const router = require("express").Router()
const List = require("../models/List")
const CryptoJS = require("crypto-js")
const verify = require("../verifyToken")

// CREATE

router.post("/", async (req, res) => {
    // if(req.user.isAdmin) {
        const newList = new List(req.body)

        const checkList = await List.findOne({ date: req.body.date})
        
        if(checkList) {
            const updatedList = await List.findByIdAndUpdate(checkList.id, 
                {
                    $set:req.body,
                },
                { new: true }
            )
            res.status(200).json(updatedList)
        } else {
            try {
                const savedList = await newList.save()
                res.status(200).json(savedList)
            } catch (err) {
                res.status(500).json(err)
            }  
        }
    // } else {
    //     res.status(500).json("you are not allowed!")
    // }
})

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
            const updatedList = await List.findByIdAndUpdate(req.params.id, 
                {
                    $set:req.body,
                },
                { new: true }
            )
            res.status(200).json(updatedList)
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
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json("List has been deleted...")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you can delete only your account!")
    }
})

//GET

router.get("/find/:date", async (req, res) => {
    try {
        const list = await List.findOne({ date: req.params.date })
        res.status(200).json(list)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get("/", async (req, res) => {
    // if(req.user.isAdmin) {
        try {
            const lists = await List.find()
            res.status(200).json({ lists })
        } catch (err) {
            res.status(500).json(err)
        }
    // } else {
    //     res.status(500).json("you are not allowed to see all lists!")
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
        const data = await List.aggregate([
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