
/**
 * controller
 * /order
 * 订单信息
 * **/

const express = require('express');
let router = express.Router();
//data access object
let dao = require("../service/order")

router.get("/getAllOrderInfo", async function (req, res, next) {
    let { query } = req;
    let result = await dao.select(query);
    res.json(result);
})

router.get("/getOrderByLike", async function (req, res, next) {
    let { query } = req;
    let result = await dao.selectByLike(query);
    res.json(result);
})

module.exports = router;