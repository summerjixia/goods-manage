const db = require("../db.js");
const Common = require("./common")

class User extends Common {
    constructor() {
        super();
        this.table = "user";
    }
    async selectUserRole() {
        let sql = `SELECT user.id user_id,user.code user_code,role.id role_id,role.code role_code ,role.text role_text
         FROM user , role,user_role WHERE user.id = user_role.user_id AND role.id = user_role.role_id 
         ORDER BY user.id`;
        let result = await this.customeSqlChange(sql);
        return result;
    }
}

class Role extends Common {
    constructor() {
        super();
        this.table = "role";
        this.ignoreObjColumn = ['auth'];
    }
    // async selectRoleAuth() {
    //     let sql = `SELECT role.id role_id,role.code role_code,role.text role_text,auth.id auth_id,auth.code auth_code ,auth.text auth_text
    //     FROM role , authority auth,auth_role WHERE role.id = auth_role.role_id AND auth.id = auth_role.auth_id 
    //     ORDER BY role.id`
    //     let result = await this.customeSqlChange(sql);
    //     return result;
    // }

    async insertRoleAuth({ role, auth }) {
        let sql = "";
        auth.forEach(item => {
            sql += ` insert into auth_role(role_id,auth_id)values(${role},${item});`
        })
        let result = await this.customeSqlChange(sql);
        return result;
    }

    async updateRoleAuth({ role, auth }) {
        let sql = `SELECT auth_role.*  FROM auth_role where auth_role.role_id=${role}`;
        let result = await this.customeSqlChange(sql);
        let deleteSql = '';
        let insertSql = '';
        result.forEach(item => {
            if (auth.indexOf(item.authId) === -1) {
                deleteSql += `delete from auth_role where id=${item.id};`;
            }
        })
        auth.forEach(item => {
            let flag = false;
            result.forEach(ritem => {
                if (item === ritem.authId) {
                    flag = true;
                }
            })
            if (!flag) {
                insertSql += ` insert into auth_role(role_id,auth_id)values(${role},${item});`
            }
        })
        deleteSql && await this.customeSqlChange(deleteSql);
        insertSql && await this.customeSqlChange(insertSql);
        return result;
    }

    async deleteRoleAuth(param) {
        param = param instanceof Array === true ? param : [param]
        let deleteSql = '';
        param.forEach(item => {
            deleteSql += ` delete from auth_role where role_id = ${item.id}`;
        })
        let result = await this.customeSqlChange(deleteSql);
        return result;
    }

    async selectRoleAuth(param) {
        let current = param && param.current ? param.current : 1;
        let sql = "SELECT role.*,auth_role.auth_id auth FROM role,auth_role where role.id=auth_role.role_id ORDER BY role.code";
        let result = await this.customeSqlChange(sql);
        let newObj = Object.assign({}, result[0]);
        newObj.auth = [newObj.auth];
        let newArray = [];
        for (let i = 1; i < result.length; i++) {
            if (result[i].code === result[i - 1].code) {
                newObj.auth.push(result[i].auth);
            } else {
                newArray.push(newObj);
                newObj = Object.assign({}, result[i]);
                newObj.auth = [newObj.auth];
            }
        }
        newArray.push(newObj);
        let total = newArray.length;//查询role表就可以
        current = !current ? 1 : current;
        newArray = newArray.splice((current - 1) * 10, current * 10);
        return { data: newArray, total };
    }
}

class Auth extends Common {
    constructor() {
        super();
        this.table = "authority";
    }
}

class Library extends Common {
    constructor() {
        super();
        this.table = "library";
    }
    async getAllLibrary() {
        let data = await this.select();
        let map = {};
        data.forEach(item => {
            if (map[item.type]) {
                map[item.type].push(item);
            } else {
                map[item.type] = [item];
            }
        });
        return map;
    }
}

class Other extends Common {
    async matchUserName(userName, password) {
        this.table = "user";
        let data = await this.select({ code: userName });
        data = this.oneObjectResult(data);
        if (data.password === password) {
            return data;
        }
        return null;
    }
    async selectGoodsUser() {
        this.table = 'goods_user';
        return this.select();
    }
    async selectGoodsUserByLike(query) {
        this.table = 'goods_user';
        return this.selectByLike(query);
    }
    async selectAllMenu(id) {
        let sql = `SELECT menu.* FROM role,menu,menu_role WHERE role.id = ${id}
        AND role.id = menu_role.role_id AND menu.id = menu_role.menu_id and menu.show = 1`;
        let result = await this.customeSqlChange(sql);
        let newObj = [];
        result.forEach(item => {
            if (!item.parent) {
                newObj.push(item);
                getMenu(item, result, 2);
            }
        })

        function getMenu(item, data, level) {
            item.children = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].level === level && data[i].parent === item.id) {
                    item.children.push(data[i]);
                    getMenu(data[i], data, level + 1);
                }
            }
        }

        return newObj;
    }


}

module.exports = {
    user: new User(),
    role: new Role(),
    auth: new Auth(),
    library: new Library(),
    other: new Other()
}