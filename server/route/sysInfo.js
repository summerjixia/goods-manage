/**
 * controller
 * /sys
 * 项目信息
 * **/
const express = require('express');
let router = express.Router();
var bodyParser = require('body-parser');
let jsonParser = bodyParser.json()
//data access object
let dao = require("../service/sysInfo");
let { user: userDao, role: roleDao, auth: authDao, library: libraryDao, other } = dao;

//登录
router.post("/login", jsonParser, async function (req, res, next) {
    let { body: { userName, password } } = req;
    try{
        let matchRes = await other.matchUserName(userName, password);
        if (matchRes) {
            res.json({ flag: true, user: matchRes })
        } else {
            res.json({ flag: false })
        }
    }catch(e){
        res.json({ flag: false })
    }
})

router.post("/getMenu", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let menuData = [];
    let libraryData = [];
    menuData = await other.selectAllMenu(params.role);
    libraryData = await libraryDao.getAllLibrary();
    //查询角色权限放到library里
    let role = await roleDao.select();
    let auth = await authDao.select();
    libraryData['role'] = role;
    libraryData['auth'] = auth;
    res.json({ menuData, libraryData })
})

//用户信息/权限/角色
router.get("/getUserRoleAuth", async function (req, res, next) {
    let user = await userDao.selectUserRole();
    let children = [];
    let userTemp = [];
    for (let i = 0; i < user.length; i++) {
        let item = user[i];
        children.push({ roleId: item.roleId, roleCode: item.roleCode, roleText: item.roleText });
        if (i === user.length - 1) {
            userTemp.push({ id: item.userId, code: item.userCode, children })
            break;
        }
        if (item.userId !== user[i + 1].userId) {
            userTemp.push({ id: item.userId, code: item.userCode, children })
            children = []
        }
    }

    let role = await roleDao.selectRoleAuth();
    children = [];
    let roleTemp = [];
    for (let i = 0; i < role.length; i++) {
        let item = role[i];
        children.push({ authId: item.authId, authCode: item.authCode, authText: item.authText });
        if (i === role.length - 1) {
            roleTemp.push({ id: item.roleId, code: item.roleCode, text: item.roleText, children })
            break;
        }
        if (item.roleId !== role[i + 1].roleId) {
            roleTemp.push({ id: item.roleId, code: item.roleCode, text: item.roleText, children })
            children = []
        }
    }

    let auth = await authDao.select();
    res.json({ user: userTemp, role: roleTemp, auth });

})
router.get("/getUserInfo", async function (req, res, next) {
    let { query } = req;
    let result = await userDao.selectByPage(query);
    res.json(result);
})

router.get("/getUserInfoByLike", async function (req, res, next) {
    let { query } = req;
    let result = await userDao.selectByLike(query);
    res.json(result);
})

router.post("/insertUserInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await userDao.insert(params);
    result = await userDao.selectByPage();
    res.json(result);
})

router.post("/updateUserInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await userDao.update(params);
    result = await userDao.selectByPage();
    res.json(result);
})

router.post("/deleteUserInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await userDao.deleted(params);
    result = await userDao.selectByPage();
    res.json(result);
})

//角色
router.get("/getRoleInfo", async function (req, res, next) {
    let { query } = req;
    let result = await roleDao.selectRoleAuth(query);
    res.json(result);
})

router.get("/getRoleInfoByLike", async function (req, res, next) {
    let { query } = req;
    let result = await roleDao.selectByLike(query);
    res.json(result);
})

router.post("/insertRoleInfo", jsonParser, async function (req, res, next) {
    //role role_auth
    let { body: params } = req;
    let auth = params.auth;
    delete params.auth;
    let { insertId } = await roleDao.insert(params);
    await roleDao.insertRoleAuth({ role: insertId, auth: auth });
    result = await roleDao.selectRoleAuth();
    res.json(result);
})

router.post("/updateRoleInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let id = params.id;
    let auth = params.auth;
    delete params.auth;
    let result = await roleDao.update(params);
    await roleDao.updateRoleAuth({ role: id, auth });
    result = await roleDao.selectRoleAuth();
    res.json(result);
})

router.post("/deleteRoleInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let param = Object.assign([], params);
    let result = await roleDao.deleted(params);
    result = await roleDao.deleteRoleAuth(param);
    result = await roleDao.selectRoleAuth();
    res.json(result);
})

//权限
router.get("/getAuthInfo", async function (req, res, next) {
    let { query } = req;
    let result = await authDao.selectByPage(query);
    res.json(result);
})

router.get("/getAuthInfoByLike", async function (req, res, next) {
    let { query } = req;
    let result = await authDao.selectByLike(query);
    res.json(result);
})

router.post("/insertAuthInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await authDao.insert(params);
    result = await authDao.selectByPage();
    res.json(result);
})

router.post("/updateAuthInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await authDao.update(params);
    result = await authDao.selectByPage();
    res.json(result);
})

router.get("/deleteAuthInfo", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await authDao.deleted(params);
    result = await authDao.selectByPage();
    res.json(result);
})


//字典
router.get("/getCategory", async function (req, res, next) {
    let { query } = req;
    let result = await libraryDao.selectByPage(query);
    res.json(result);
})
router.get("/getCategoryByLike", async function (req, res, next) {
    let { query } = req;
    let result = await libraryDao.selectByLike(query);
    res.json(result);
})
router.post("/insertCategory", jsonParser, async (req, res, next) => {
    let { body: params } = req;
    let result = await libraryDao.insert(params);
    result = await libraryDao.select();
    res.json(result);
})
router.post("/updateCategory", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await libraryDao.update(params);
    result = await libraryDao.select();
    res.json(result);
})
router.post("/deleteCategory", jsonParser, async function (req, res, next) {
    let { body: params } = req;
    let result = await libraryDao.deleted(params);
    result = await libraryDao.select();
    res.json(result);
})


//商品用户
router.get("/getGoodsUser", async function (req, res, next) {
    let { query } = req;
    let result = await other.selectGoodsUser(query);
    res.json(result);
})
router.get("/getGoodsUserByLike", async function (req, res, next) {
    let { query } = req;
    let result = await other.selectGoodsUserByLike(query);
    res.json(result);
})


module.exports = router;