/**
 * controller
 * /goods
 * 商品信息
 * **/
const express = require('express');
let router = express.Router();
var bodyParser = require('body-parser');
let jsonParser = bodyParser.json()
//data access object
let dao = require("../service/goodInfo")
let sysDao = require("../service/sysInfo");
let { user: userDao, brand: brandDao, other } = sysDao;

router.get("/getAllGoodsInfo", async function (req, res, next) {
  let { query } = req;
  let result = await dao.select(query);
  res.json(result);
})

router.get("/getAllGoodsByLike", async function (req, res, next) {
  let { query } = req;
  let result = await dao.selectByLike(query);
  res.json(result);
})

router.get("/getGoodsInfoById", async function (req, res, next) {
  let { query: { id } } = req;
  let result = await dao.selectById(id);
  res.json(result);
})

router.post("/updateGoodsInfo", async function (req, res, next) {
  let { body: params } = req;
  let result = await dao.update(params);
  result = await dao.select();
  res.json(result);
})

router.post("/insertGoodsInfo", jsonParser, async function (req, res, next) {
  let { body: params } = req;
  let result = await dao.insert(params);
  result = await dao.select();
  res.json(result);
})

router.post("/deleteGoodsInfo", jsonParser, async function (req, res, next) {
  let { body: params } = req;
  let result = await dao.deleted(params);
  result = await dao.select();
  res.json(result);
})




module.exports = router;