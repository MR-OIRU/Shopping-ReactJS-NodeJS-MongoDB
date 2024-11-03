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
    Sex: { type: String, required: true },
    Phone: { type: String },
    Password: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    CartUser: { type: String }
})

let brandSchema = mongoose.Schema({
    BrandID: { type: String, required: true },
    BrandName: { type: String, required: true },
    Date: { type: Date, default: Date.now }
})

let productSchema = mongoose.Schema({
    ProductID: { type: String, required: true },
    ProductBrand: { type: String, required: true },
    ProductName: { type: String, required: true },
    ProductQuantity: { type: Number, required: true },
    ProductImage: { type: String, required: true },
    CostPrice: { type: Number, required: true },
    SellPrice: { type: Number, required: true },
    ProductSold: { type: Number, default: 0 },
    ProductDate: { type: Date, default: Date.now },
})

let orderProductSchema = mongoose.Schema({
    productID: { type: String, required: true },
    productBrand: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productImage: { type: String, required: true }
})

let orderSchema = mongoose.Schema({
    Username: { type: String, required: true },
    orderID: { type: String, required: true },
    orderName: { type: String, required: true },
    orderAddress: { type: String, required: true },
    orderProduct:[orderProductSchema],
    orderPriceTotal: { type: Number, required: true },
    orderAdditional: { type: String, required: false },
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