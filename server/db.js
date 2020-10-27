const mysql = require("mysql");

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'jixia123456',
    database: 'goods',
    port: 3306
}

//使用连接池
var connection = mysql.createPool(mysqlConfig);

//公共查询方法
function select(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = {
    select
}