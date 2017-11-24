const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.ctrl');

router.get("/", productCtrl.get);
router.get("/new", productCtrl.new);
router.post("/new", productCtrl.save);
router.post("/delete/:id", productCtrl.delete);
router.get("/:id", productCtrl.getById);


module.exports = router;