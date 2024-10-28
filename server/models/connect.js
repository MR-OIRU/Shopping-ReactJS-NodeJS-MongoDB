// use mongoose

const mongoose = require('mongoose')

// connect MongoDB
const url = process.env.API_DATABASE
const db = `mongodb://${url}`
mongoose.connect(db).catch(err=>console.log(err))

// design Schema
let memberSchema = mongoose.Schema({
    Role: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Phone: { type: String },
    Password: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    CartUser: { type: String }
})

let brandSchema = mongoose.Schema({
    brandID: { type: String, required: true },
    brandName: { type: String, required: true },
    Date: { type: Date, default: Date.now }
})

let productSchema = mongoose.Schema({
    productID: { type: String, required: true },
    productBrand: { type: String, required: true },
    productName: { type: String, required: true },
    productQuantity: { type: String, required: true },
    productImage: { type: String, required: true },
    costPrice: { type: String, required: true },
    sellPrice: { type: String},
    productDate: { type: Date, default: Date.now },
})

let orderProductSchema = mongoose.Schema({
    ID: { type: String, required: true },
    productID: { type: String, required: true },
    productBrand: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    productQuantity: { type: String, required: true },
    productImage: { type: String, required: true }
})

let orderSchema = mongoose.Schema({
    userID: { type: String, required: true },
    orderID: { type: String, required: true },
    orderName: { type: String, required: true },
    orderAddress: { type: String, required: true },
    orderProduct:[orderProductSchema],
    orderPriceTotal: { type: String, required: true },
    orderAdditional: { type: String, required: true },
    orderStatus: { type: String, required: true },
    orderDate: { type: Date, default: Date.now }
})

// create Model

let Member = mongoose.model("members",memberSchema)
let Brand = mongoose.model("brands",brandSchema)
let Product = mongoose.model("products",productSchema)
let Order = mongoose.model("orders",orderSchema)

// export Model

module.exports =    {   Member,
                        Brand,
                        Product,
                        Order,
                        saveData: function(data){ return data.save() }
                    }