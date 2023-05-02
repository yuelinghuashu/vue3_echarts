const express = require('express')
const router = express.Router()
const fourData = require('../mock/four.json')

// req：请求消息 res：响应消息
router.get('/data', (req, res) => {
    res.send(fourData)
})

module.exports = router
