const db = require("../db.js");
const CommonUtil = require("./commonUtil");

class Common extends CommonUtil {
    constructor() {
        super();
    }

    //返回数组及总数,默认分页是10条
    async selectByPage(param) {
        let current = param && param.current ? param.current : 1;
        param && param.current && delete param.current;
        let sql = `select * from ${this.table}`;
        param = param && this.deleteFalseColumn(param);
        param = param && this.changeColumnToDataType(param);
        param && Object.keys(param).length > 0 && (sql += ' where ');
        param && Object.keys(param).forEach((key, index) => {
            sql += `${key} = ${param[key]}`;
            index !== Object.keys(param).length - 1 && (sql += ' and ');
        })
        let total = await db.select(`select count(*) total from (${sql}) ${this.table}_count`);
        sql += ` limit ${(current - 1) * 10},${current * 10}`
        total = this.oneValueResult(total);
        let data = await db.select(sql);
        data = this.changeColumnToObjTypeByArray(data);
        return { total, data };
    }

    async select(param = {}) {
        let sql = `select * from ${this.table}`;
        param = this.deleteFalseColumn(param);
        param = this.changeColumnToDataType(param);
        Object.keys(param).length > 0 && (sql += ' where ');
        Object.keys(param).forEach((key, index) => {
            sql += `${key} = '${param[key]}'`;
            index !== Object.keys(param).length - 1 && (sql += ' and ');
        })
        let data = await db.select(sql);
        data = this.changeColumnToObjTypeByArray(data);
        return data;
    }

    async selectByLike(param = {}) {
        let sql = `select * from ${this.table}`;
        param = this.deleteFalseColumn(param);
        param = this.changeColumnToDataType(param);
        Object.keys(param).length > 0 && (sql += ' where ');
        Object.keys(param).forEach((key, index) => {
            sql += `${key} like '%${param[key]}%'`;
            index !== Object.keys(param).length - 1 && (sql += ' and ');
        })
        let data = await db.select(sql);
        data = this.changeColumnToObjTypeByArray(data);
        let total = await db.select(`select count(*) total from (${sql}) ${this.table}_total`);
        total = this.oneValueResult(total);
        return { total, data };
    }

    async selectById(id) {
        let sql = `select * from ${this.table} where id = ${id}`;
        let data = await db.select(sql);
        data = this.changeColumnToObjType(this.oneObjectResult(data));
        return data;
    }

    async update(params) {
        let set = {};
        let where = {};
        if (!params.set && !params.where) {
            where = { id: params.id };
            delete params.id;
            set = { ...params };
        } else {
            set = params.set;
            where = params.where;
        }
        let sql = `update ${this.table}`;
        let setSql = " set ";
        let whereSql = " where ";
        set = this.deleteFalseColumn(set);
        where = this.deleteFalseColumn(where);
        set = this.changeColumnToDataType(set);
        where = this.changeColumnToDataType(where);
        Object.keys(set).forEach((key, index) => {
            setSql += `${key} = '${set[key]}'`;
            index !== Object.keys(set).length - 1 && (setSql += ' , ');
        })
        Object.keys(where).forEach((key, index) => {
            whereSql += `${key} = '${where[key]}'`;
            index !== Object.keys(where).length - 1 && (whereSql += ' and ');
        })
        sql = sql + setSql + whereSql;
        let data = await db.select(sql);
        return data;
    }

    async deleted(param = {}) {
        let sql = `delete from ${this.table} where `;
        param = param instanceof Array === true ? param : [param]
        param = this.deleteIgnoreObjColumn(param);
        param = this.deleteFalseColumnByArray(param);
        param = this.changeColumnToDataTypeByArray(param);
        const appendSql = (tempSql, obj) => {
            obj = this.deleteFalseColumn(obj);
            if (Object.keys(obj).length < 1) {
                throw new Error("db deleted no params");
            }
            Object.keys(obj).forEach((key, index) => {
                tempSql += `${key} = '${obj[key]}'`;
                index !== Object.keys(obj).length - 1 && (tempSql += ' and ');
            })
            return tempSql;
        }
        if (param.length > 1) {
            for (let i = 0; i < param.length; i++) {
                let tempSql = "";
                tempSql = appendSql(tempSql, param[i]);
                sql += `(${tempSql})`;
                i !== param.length - 1 && (sql += ' or ');
            }
        } else {
            param = param[0];
            let tempSql = "";
            tempSql = appendSql(tempSql, param);
            sql += tempSql;
        }

        let data = await db.select(sql);
        return data;
    }

    async insert(param = {}) {
        let sql = "";
        param = this.deleteFalseColumn(param);
        param = this.changeColumnToDataType(param);
        param = param instanceof Array ? [...param] : [param];
        const appendSql = (tempSql, obj) => {
            obj = this.deleteFalseColumn(obj);
            if (Object.keys(obj).length < 1) {
                throw new Error("db deleted no params");
            }
            let columns = '(';
            let value = 'VALUES(';
            Object.keys(obj).forEach((key, index) => {
                columns += `${key}`;
                index !== Object.keys(obj).length - 1 && (columns += ',');
                value += `'${obj[key]}'`;
                index !== Object.keys(obj).length - 1 && (value += ',');
            })
            columns += ')';
            value += ')';
            tempSql = columns + value;
            return tempSql;
        }
        for (let i = 0; i < param.length; i++) {
            let tableSql = `insert into ${this.table} `;
            let tempSql = "";
            tempSql = appendSql(tempSql, param[i]);
            sql = sql + (tableSql + tempSql) + ";";
        }

        let data = await db.select(sql);
        return data;
    }

    async customeSqlChange(sql, params = {}) {
        params = this.deleteFalseColumn(params);
        params = this.changeColumnToDataType(params);
        Object.keys(params).forEach(key => {
            sql.replace(`$${key}`, params[key]);
        })
        let data = await db.select(sql);
        data instanceof Array === true && (data = this.changeColumnToObjTypeByArray(data));
        return data;
    }
    async customeSqlChangeToObjResult(sql, params) {
        params = this.deleteFalseColumn(params);
        params = this.changeColumnToDataType(params);
        Object.keys(params).forEach(key => {
            sql.replace(`$${key}`, params[key]);
        })
        let data = await db.select(sql);
        data = this.oneObjectResult(data);
        data = this.changeColumnToObjTypeByArray(data);
        return data;
    }
    async customeSqlChangeToOneResult(sql, params) {
        params = this.deleteFalseColumn(params);
        params = this.changeColumnToDataType(params);
        Object.keys(params).forEach(key => {
            sql.replace(`$${key}`, params[key]);
        })
        let data = await db.select(sql);
        data = this.oneValueResult(data);
        data = this.changeColumnToObjTypeByArray(data);
        return data;
    }
}

module.exports = Common;