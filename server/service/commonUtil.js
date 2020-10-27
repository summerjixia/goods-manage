
module.exports = class CommonUtil {
    //自定义sql过滤$key1,$key2占位符返回一个值
    customeSqlToOneResult(sql, params) {
        let data = this.customeSqlChange(sql, params);
        data = this.changeColumnToObjType(data);
        data = this.oneValueResult(data);
        return data;
    }


    //数据库返回一个值
    oneValueResult(arr) {
        for (let key in arr[0]) {
            return arr[0][key];
        }
    }

    //数据库返回一个对象
    oneObjectResult(arr) {
        if (arr instanceof Array && arr.length > 0) {
            return arr[0];
        }
    }

    //字段值不为true的剔除
    deleteFalseColumn(obj) {
        let newObj = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] || obj[key] === 0 || obj[key] === '0') {
                newObj[key] = obj[key];
            }
        })
        return newObj;
    }

    deleteFalseColumnByArray(array) {
        let newArr = [];
        for (let obj of array) {
            newArr.push(this.deleteFalseColumn(obj));
        }
        return newArr;
    }

    //对象字段大写转_  或者将值json格式化为字符串，替换掉需要换的字段，然后将字符串格式为json对象
    changeColumnToDataTypeByArray(arr) {
        let newArr = [];
        for (let obj of arr) {
            newArr.push(this.changeColumnToDataType(obj));
        }
        return newArr;
    }
    //对象字段大写转_
    changeColumnToDataType(obj) {
        let reg = /[A-Z]{1,5}/g;
        let newObj = {};
        for (let key in obj) {
            let match = key.match(reg);
            let split = key.split(reg);
            if (!match || !split) {
                newObj[key] = obj[key];
                continue;
            };
            let splitkey = split.map((item, index) => {
                if (match.length - 1 < index) {
                    return item.toLocaleLowerCase();
                }
                return item.toLocaleLowerCase() + "_" + match[index].toLocaleLowerCase();
            }).join('');
            newObj[splitkey] = obj[key];
        }
        return newObj;
    }
    //数据库字段_转大写
    changeColumnToObjTypeByArray(arr) {
        let newArr = [];
        for (let obj of arr) {
            newArr.push(this.changeColumnToObjType(obj));
        }
        return newArr;
    }
    changeColumnToObjType(obj) {
        let newObj = {};
        for (let key in obj) {
            let arr = key.split("_");
            if (arr.length === 1) {
                newObj[key] = obj[key]
                continue;
            };
            let splitkey = arr.map((item, index) => {
                if (index === 0) return item.toLocaleLowerCase();
                return item.substring(0, 1).toLocaleUpperCase() + item.substring(1, item.length);
            }).join('');
            newObj[splitkey] = obj[key];
        }
        return newObj;
    }

    deleteIgnoreObjColumn(data) {
        this.ignoreObjColumn && data.forEach(item => {
            Object.keys(item).forEach(key => {
                if (this.ignoreObjColumn.indexOf(key) !== -1) {
                    delete item[key];
                }

            })
        })
        return data;
    }
}