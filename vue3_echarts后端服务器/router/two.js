const express = require('express')
const router = express.Router()
const twoData = require('../mock/two.json')

// req：请求消息 res：响应消息
router.get('/data', (req, res) => {
    res.send(twoData)
})

module.exports = router
