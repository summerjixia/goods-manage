const Common = require("./common")

class Order extends Common{
    constructor() {
        super();
        this.table = "order_list";
    }
}

module.exports = new Order()