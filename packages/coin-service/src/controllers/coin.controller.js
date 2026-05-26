const coinService = require('../services/coin.service')

async function getBalance(req, res, next) {
  try {
    const balance = await coinService.getBalance(req.user.id)
    res.json(balance)
  } catch (err) { next(err) }
}

async function getHistory(req, res, next) {
  try {
    const history = await coinService.getHistory(req.user.id)
    res.json(history)
  } catch (err) { next(err) }
}

module.exports = { getBalance, getHistory }