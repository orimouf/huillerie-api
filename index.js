const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const uniqueIdRoute = require("./routes/uniqueId")
const productRoute = require("./routes/products")
const listRoute = require("./routes/list")
const orderRoute = require("./routes/orders")
const orderedProductRoute = require("./routes/orderedProducts")
const appData = require("./routes/appdata")
const paymentData = require("./routes/payments")
const clientRoute = require("./routes/clients")
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

dotenv.config();

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("DB connection Successfull!"))
//     .catch((err) => console.log(err));
// }
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection Successfull!"))
    .catch((err) => console.log(err));

app.use(express.json())
app.use(cors(corsOptions)) 

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/uniqueIds", uniqueIdRoute)
app.use("/api/clients", clientRoute)
app.use("/api/products", productRoute)
app.use("/api/lists", listRoute)
app.use("/api/payments", paymentData)
app.use("/api/orders", orderRoute)
app.use("/api/allproducts", orderedProductRoute)
app.use("/api/appData", appData)


app.listen(8800, () => {
    console.log("Backend server is running!");
})