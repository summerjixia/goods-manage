
/**
 * controller
 * /shoppingCart
 * 购物车
 * **/
const express = require('express');
let router = express.Router();
//data access object
let dao = require("../service/shoppingCart")

router.get("/getAllShoppingCart", async function (req, res, next) {
    let { query } = req;
    let result = await dao.select(query);
    res.json(result);
})

router.get("/getShopppingCartById", async function (req, res, next) {
    let { query } = req;
    let result = await dao.selectById(query);
    res.json(result);
})

module.exports = router;