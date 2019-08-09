'use strict';

const bcklib = require('bcklib');
const Sequelize = require('sequelize');

const dbConfig = bcklib.config.load('db.js');

module.exports = new Sequelize(dbConfig.mysql.database, dbConfig.mysql.username, dbConfig.mysql.password, {
    host: dbConfig.mysql.host,
    dialect: dbConfig.mysql.dialect,
    timezone: '+08:00', // 设置时区
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    define: {
        timestamps: false,  // 是否添加时间戳属性 (updatedAt, createdAt)
        createdAt:false,    //是否添加createdAt，启用时间戳时才有效，可以设置为具体子段名，例如：create_time
        updatedAt:'update_time',    //更新时间戳，同createdAt
        deletedAt:false,    //逻辑删除时间戳，同createdAt
        paranoid: true,     // 逻辑删除，删除时增加一个 deletedAt 标识当前时间，启用时间戳时才有效
        underscored: true,  //命名规则下划线还是驼峰式
        freezeTableName: true,  //是否禁用自动修改表名（默认表名自动转复数）
        engine: 'MYISAM',    //全局设置表引擎, 默认是 InnoDB

        // 启用乐观锁定。 启用时，sequelize将向模型添加版本计数属性，
        // 并在保存过时的实例时引发OptimisticLockingError错误。
        // 设置为true或具有要用于启用的属性名称的字符串。
        //version: true

        // SQLite only
        // storage: 'path/to/database.sqlite'
    }
});