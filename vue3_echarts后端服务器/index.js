// 导入基本模块
const express = require('express')
const app = express()

// 后端解决跨域问题的方法
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization,Accept, X-Requested-With, yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
})

// 导入路由文件
const charOne = require('./router/one')
const charTwo = require('./router/two')
const charThree = require('./router/three')
const charFour = require('./router/four')
const charMap = require('./router/map')

// 使用中间件来配置路由
app.use('/one', charOne)
app.use('/two', charTwo)
app.use('/three', charThree)
app.use('/four', charFour)
app.use('/map', charMap)

app.listen(8080, () => {
    console.log('Express Server Running http://localhost:8080/')
})