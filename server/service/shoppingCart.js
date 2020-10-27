const Common = require("./common")

class shoppingCart extends Common{
    constructor() {
        super();
        this.table = "shopping_cart";
    }
}

module.exports = new shoppingCart()