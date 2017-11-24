const Product = require('../models/product.model');
const Review = require('../models/review.model');


module.exports = {
    get: (req, res) => {

        Product.find()
            .sort("-lastUpdated")
            .exec()
            .then(function (products) {
                res.render("products", { products: products });
            })
            .catch(function (err) {
                res.render("error", { err: err });
            });
    },

    getById: (req, res) => {

        Product.findById(req.params.id)
            .exec()
            .then(function (product) {

                Review.find({ productId: req.params.id })
                    .exec()
                    .then(function (reviews) {

                        var jsonProduct = product.toJSON();
                        jsonProduct.reviews = reviews;

                        res.locals.product = jsonProduct;
                        res.render("product-detail");
                    });




            })
            .catch(function (err) {
                res.status(500);
                res.render("error", { err: err });
            })

    },

    delete: (req, res) => {

        Product.findByIdAndRemove(req.params.id)
            .then(function () {
                res.redirect("/products");
            })
            .catch(function (err) {
                res.render("error", { err: err });
            });

        //Delete the user


    },

    new: (req, res) => {
        res.render("new-product");
    },

    save: (req, res) => {

        var product = new Product(req.body);
        product.save()
            .then(function () {
                res.redirect("/products");
            })
            .catch(function (err) {
                res.render("error");
            });
    }
}