var express = require("express")
var router = express.Router()
var models = require("../models/index")

function response(array, parent, tree) {
	tree = []
	parent = parent ? parent : { id: null }
	let childNetworkNodes = array.filter(c => c.parentId === parent.id)
	if (childNetworkNodes) {
		if (!parent.id) {
			tree = childNetworkNodes
		} else {
			parent.childNetworkNodes = childNetworkNodes
		}
		childNetworkNodes.forEach(c => response(array, c))
	}
	return tree
}

router.get("/", function (req, res) {
	models.NetworkNodes.findAll({}).then(function (networkNodes) {
		res.json(response(networkNodes.map(i => i.get({ plain: true }))))
	})
})

router.get("/:id", function (req, res) {
	models.NetworkNodes.findById(req.params.id).then(function (networkNodes) {
		res.json(networkNodes)
	})
})

router.post("/", function (req, res) {
	const body = req.body
	models.NetworkNodes.create({ ...body }).then(function (networkNodes) {
		res.json(networkNodes)
	})
})

router.put("/:id", function (req, res) {
	const body = req.body
	models.NetworkNodes.update(body, { where: { id: req.params.id }, returning: true }).then(function (networkNodes) {
		res.json(networkNodes)
	})
})

router.delete("/:id", function (req, res) {
	models.NetworkNodes.destroy({
		where: {
			id: req.params.id
		}
	}).then(function (networkNodes) {
		res.json(networkNodes)
	})
})

module.exports = router
