const Product = require('../models/product.model');

module.exports = {
    get: (req, res) => {

        Product.find()
            .exec()
            .then(function (products) {
                res.render("products", { products: products });
            })
            .catch(function (err) {
                res.render("error", { err: err });
            });
    }
}