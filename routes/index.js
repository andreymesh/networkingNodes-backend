var express = require("express")
var router = express.Router()
var models = require("../models/index")

const response = (array, parent, tree) => {
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

const responseId = (parent, child) => {
	parent.childNetworkNodes = child.map(item => ({ ...item, childNetworkNodes: [] }))
	return parent
}

const update = data => ({ ...data, childNetworkNodes: [] })



router.get("/", function (req, res) {
	models.NetworkNodes.findAll({ where: { parentId: null } }).then(function (networkNodes) {
		res.json(response(networkNodes.map(i => i.get({ plain: true }))))
	})
})

router.get("/:id", function (req, res) {
	models.NetworkNodes.findById(req.params.id).then(function (networkNode) {
		const result = networkNode.get({ plain: true })
		models.NetworkNodes.findAll({ where: { parentId: result.id } }).then(function (networkNode) {
			res.json(responseId(result, networkNode.map(i => i.get({ plain: true }))))
		})
	})
})

router.post("/", function (req, res) {
	const body = req.body
	models.NetworkNodes.create({ ...body }).then(function (response) {
		res.json(update(response.get({ plain: true })))
	})
})

router.put("/:id", function (req, res) {
	const body = req.body
	models.NetworkNodes.update(body, { where: { id: req.params.id }, returning: true }).then(function (response) {
		res.json(update(response[1][0].get({ plain: true })))
	})
})

router.delete("/:id", function (req, res) {
	models.NetworkNodes.findById(req.params.id).then(function (networkNode) {
		const result = networkNode.get({ plain: true })
		models.NetworkNodes.destroy({
			where: {
				id: req.params.id
			}
		}).then(function () {
			res.json(result)
		})
	})
})

module.exports = router
