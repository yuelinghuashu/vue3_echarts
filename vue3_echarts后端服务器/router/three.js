const express = require('express')
const router = express.Router()
const threeData = require('../mock/three.json')

// req：请求消息 res：响应消息
router.get('/data', (req, res) => {
    res.send(threeData)
})

module.exports = router
