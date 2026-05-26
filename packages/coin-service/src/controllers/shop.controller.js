const shopService = require('../services/shop.service')

async function listItems(req, res, next) {
  try {
    const items = await shopService.listItems(req.query.category)
    res.json(items)
  } catch (err) { next(err) }
}

async function buyItem(req, res, next) {
  try {
    const result = await shopService.buyItem(req.user.id, req.params.itemId)
    res.json(result)
  } catch (err) { next(err) }
}

async function getMyItems(req, res, next) {
  try {
    const items = await shopService.getMyItems(req.user.id)
    res.json(items)
  } catch (err) { next(err) }
}

async function createItem(req, res, next) {
  try {
    const item = await shopService.createItem(req.body)
    res.status(201).json(item)
  } catch (err) { next(err) }
}

module.exports = { listItems, buyItem, getMyItems, createItem }