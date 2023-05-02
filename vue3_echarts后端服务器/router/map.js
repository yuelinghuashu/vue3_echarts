const express = require('express')
const router = express.Router()
const mapData = require('../mock/map.json')

// req：请求消息 res：响应消息
router.get('/data', (req, res) => {
    res.send(mapData)
})

module.exports = router
