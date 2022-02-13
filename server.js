const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const catRoute = require("./routes/category");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const fournisseurRoute = require("./routes/fournisseur");
let path = require('path');

require('dotenv').config({
    path: './config/config.env'
})

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", catRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/fournisseurs", fournisseurRoute);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client-admin/build'))
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname + '../','client-admin', 'build', 'index.html'));

    })
}



const PORT = process.env.PORT || 5500 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))