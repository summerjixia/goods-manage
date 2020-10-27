const Common = require("./common")

class GoodsInfo extends Common {
    constructor() {
        super();
        this.table = "goods_info";
    }
}

module.exports = new GoodsInfo()