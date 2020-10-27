function transColumn() {
    return {
        code: arguments[0] ? arguments[0] : 'code',
        label: arguments[1] ? arguments[1] : false,
        type: arguments[2] ? arguments[2] : "input",
        isMainPage: arguments[3] ? arguments[3] : false,
        isClick: arguments[4] ? arguments[4] : false,
        isDetailPage: arguments[5] ? arguments[5] : false,
        isSearchPage: arguments[6] ? arguments[6] : false,
        isEditor: arguments[6] ? arguments[6] : false,
    }
}

function transformUserColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "姓名", '', true, true));
        } else if (key === "password") {
            arr.push(transColumn(key, "密码", 'input', false));
        } else if (key === "role") {
            arr.push(transColumn(key, "角色", 'select', false));
        }
    }
    return arr;
}

function transformRoleColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "代码", '', true, true));
        } else if (key === "text") {
            arr.push(transColumn(key, "名称", 'input', true));
        } else if (key === "auth") {
            arr.push(transColumn('auth', "权限", 'select.multiple', false))
        }
    }
    return arr;
}

function transformAuthColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "代码", '', true, true));
        } else if (key === "text") {
            arr.push(transColumn(key, "名称", 'input', true));
        }
    }
    return arr;
}

function transformLibraryColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "代码", '', true, true,));
        } else if (key === "name") {
            arr.push(transColumn(key, "名称", 'input', true,));
        } else if (key === "identify") {
            arr.push(transColumn(key, "代号", 'input', true,));
        }
    }
    return arr;
}

function transformOrderColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "订单号", '', true, true,));
        } else if (key === "time") {
            arr.push(transColumn(key, "时间", 'input', true,));
        } else if (key === "deliver") {
            arr.push(transColumn(key, "已发货", 'select', true,));
        } else if (key === "returns") {
            arr.push(transColumn(key, "已退货", 'select', true,));
        } else if (key === "refund") {
            arr.push(transColumn(key, "已退款", 'select', true,));
        } else if (key === "arrive") {
            arr.push(transColumn(key, "已到达", 'select', true,));
        } else if (key === "doubt") {
            arr.push(transColumn(key, "是否存疑", 'select', true,));
        }
    }
    return arr;
}

function transOrderValue(data) {
    data.forEach((item, index) => {
        if (item.deliver) {
            item.deliver = this.library['deliver'][item.deliver];
        }
        if (item.returns) {
            item.returns = this.library['returns'][item.returns];
        }
        if (item.refund) {
            item.refund = this.library['refund'][item.refund];
        }
        if (item.arrive) {
            item.arrive = this.library['arrive'][item.arrive];
        }
        if (item.doubt) {
            item.doubt = this.library['doubt'][item.doubt];
        }
    })
}

function transformGoodsUserColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "代码", '', true, true,));
        } else if (key === "time") {
            arr.push(transColumn(key, "时间", 'input', true,));
        } else if (key === "password") {
            arr.push(transColumn(key, "密码", 'select', true));
        }
    }
    return arr;
}

function transformGoodsInfoColumn(data) {
    let arr = [];
    for (let key in data) {
        if (key === "code") {
            arr.push(transColumn(key, "代码", '', true, true,));
        } else if (key === "time") {
            arr.push(transColumn(key, "时间", 'input', true,));
        } else if (key === "promoteSales") {
            arr.push(transColumn(key, "是否促销", 'select', true,));
        } else if (key === "brand") {
            arr.push(transColumn(key, "品牌", 'input', true,));
        } else if (key === "price") {
            arr.push(transColumn(key, "价格", 'input', true,));
        } else if (key === "stock") {
            arr.push(transColumn(key, "库存", 'input', true,));
        }
    }
    return arr;
}

function transGoodsInfoValue(data) {
    data.forEach((item, index) => {
        if (item.promoteSales) {
            item.promoteSales = this.library['promoteSales'][item.promoteSales];
        }
    })
}

export const userMethods = { methods: { transformUserColumn } }
export const roleMethods = { methods: { transformRoleColumn } }
export const authMethods = { methods: { transformAuthColumn } }
export const libraryMethods = { methods: { transformLibraryColumn } }
export const orderMethods = { methods: { transformOrderColumn, transOrderValue } }
export const goodsUserMethods = { methods: { transformGoodsUserColumn } }
export const goodsInfoMethods = { methods: { transformGoodsInfoColumn, transGoodsInfoValue } }