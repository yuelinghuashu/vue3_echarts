const express = require('express')
const router = express.Router()
const oneData = require('../mock/one.json')

// req：请求消息 res：响应消息
router.get('/data', (req, res) => {
    res.send(oneData)
})

module.exports = router
