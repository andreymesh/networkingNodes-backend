module.exports = (sequelize, DataTypes) => {
	return sequelize.define("networkNodes", {
		title: DataTypes.STRING,
		IPAddress: DataTypes.STRING,
		webPort: DataTypes.INTEGER,
		parentId: DataTypes.INTEGER
	})
}