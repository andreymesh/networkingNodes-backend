'use strict';
module.exports = (sequelize, DataTypes) => {
  const NetworkNodes = sequelize.define('NetworkNodes', {
    title: DataTypes.STRING,
    IPAddress: DataTypes.STRING,
    webPort: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    childrenId: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  NetworkNodes.associate = function(models) {
    // associations can be defined here
  };
  return NetworkNodes;
};