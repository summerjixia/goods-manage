import { get, post } from './getData'

//商品信息
export const getAllGoodsInfo = params => get("/apis/goods/getAllGoodsInfo", params)
export const getAllGoodsByLike = params => get("/apis/goods/getAllGoodsByLike", params)
export const insertGoodsInfo = params => post("/apis/goods/insertGoodsInfo", params)
export const updateGoodsInfo = params => post("/apis/sys/updateGoodsInfo", params)
export const deleteGoodsInfo = params => post("/apis/goods/deleteGoodsInfo", params)


//订单信息
export const getOrderInfo = params => get("/apis/sys/getOrderInfo", params)
export const getOrderInfoByLike = params => get("/apis/sys/getOrderInfoByLike", params)
export const insertOrderInfo = params => post("/apis/sys/insertOrderInfo", params)
export const updateOrderInfo = params => post("/apis/sys/updateOrderInfo", params)
export const deleteOrderInfo = params => post("/apis/sys/deleteOrderInfo", params)

//购物车信息
export const getAllShoppingCart = params => get("/apis/shoppingCart/getAllShoppingCart", params)
export const getShopppingCartById = params => get("/apis/shoppingCart/getShopppingCartById", params)

//系统信息
//登录
export const login = params => post("/apis/sys/login", params)
export const getMenu = params => post("/apis/sys/getMenu", params)

//员工信息
export const getUserInfo = params => get("/apis/sys/getUserInfo", params)
export const getUserInfoByLike = params => get("/apis/sys/getUserInfoByLike", params)
export const insertUserInfo = params => post("/apis/sys/insertUserInfo", params)
export const updateUserInfo = params => post("/apis/sys/updateUserInfo", params)
export const deleteUserInfo = params => post("/apis/sys/deleteUserInfo", params)

//角色信息
export const getRoleInfo = params => get("/apis/sys/getRoleInfo", params)
export const getRoleInfoByLike = params => get("/apis/sys/getRoleInfoByLike", params)
export const insertRoleInfo = params => post("/apis/sys/insertRoleInfo", params)
export const updateRoleInfo = params => post("/apis/sys/updateRoleInfo", params)
export const deleteRoleInfo = params => post("/apis/sys/deleteRoleInfo", params)

//权限信息
export const getAuthInfo = params => get("/apis/sys/getAuthInfo", params)
export const getAuthInfoByLike = params => get("/apis/sys/getAuthInfoByLike", params)
export const insertAuthInfo = params => post("/apis/sys/insertAuthInfo", params)
export const updateAuthInfo = params => post("/apis/sys/updateAuthInfo", params)
export const deleteAuthInfo = params => post("/apis/sys/deleteAuthInfo", params)

//字典信息
export const getLibraryInfo = params => get("/apis/sys/getLibraryInfo", params)
export const getLibraryInfoByLike = params => get("/apis/sys/getLibraryInfoByLike", params)
export const insertLibraryInfo = params => post("/apis/sys/insertLibraryInfo", params)
export const updateLibraryInfo = params => post("/apis/sys/updateLibraryInfo", params)
export const deleteLibraryInfo = params => post("/apis/sys/deleteLibraryInfo", params)

//商品分类
export const getCategory = params => get("/apis/sys/getCategory", params)
export const getCategoryByLike = params => get("/apis/sys/getCategoryByLike", params)
export const insertCategory = params => post("/apis/sys/insertCategory", params)
export const deleteCategory = params => post("/apis/sys/deleteCategory", params)
//消息推送
export const messagePush = params => get("/apis/sys/messagePush", params)
//商品用户
export const getGoodsUserInfo = params => get("/apis/sys/getGoodsUserInfo", params)
export const getGoodsUserInfoByLike = params => get("/apis/sys/getGoodsUserInfoByLike", params)
export const insertGoodsUserInfo = params => post("/apis/sys/insertGoodsUserInfo", params)
export const updateGoodsUserInfo = params => post("/apis/sys/updateGoodsUserInfo", params)
export const deleteGoodsUserInfo = params => post("/apis/sys/deleteGoodsUserInfo", params)