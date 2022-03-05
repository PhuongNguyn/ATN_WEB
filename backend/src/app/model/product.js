const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete');



const product = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    description: String,
    selectedImage: [String],
    quantity: Number,
    purchases: { type: Number, default: 0 },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
    }
},
{
    timestamps: true
})

mongoose.plugin(slug);
product.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})

module.exports = mongoose.model('products', product)