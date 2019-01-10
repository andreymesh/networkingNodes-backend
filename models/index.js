"use strict"

require("dotenv").config()
const Sequelize = require("sequelize")
const NetworkNodesModel = require("./networknodes")

const sequelize = new Sequelize(process.env.DATABASE_URL)

const NetworkNodes = NetworkNodesModel(sequelize, Sequelize)

NetworkNodes.belongsTo(NetworkNodes, {foreignKey: "parentId"})

module.exports = {
	NetworkNodes
}
