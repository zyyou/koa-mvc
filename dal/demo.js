'use strict';

const Sequelize = require('sequelize');

const db = require('./dbhelper');

const object = db.import(__dirname + "/define/demo")

exports.createTeam = async (name, leaderId, createUser) => {
    const data = await object.create({
        id: 0,
        name: name,
        leader_id: leaderId,
        deleted: 0,
        create_user: createUser
    });
    //console.log('careteTeam', data);
    return data;
}

exports.findOne = async (id) => {
    const data = await object.findOne({
        where: {
            id: id
        }
    });
    return data;
}

exports.find = async (leaderId) => {
    const data = await object.findAll({
        where: {
            leader_id: leaderId
        }
    });
    return data;
}

