const app = require('../src/app')
const debug = require('debug')('ex-test:server')
const http = require('http')

const port = app.get('PORT')

const server = http.createServer(app)

server.listen(port)
server.on('error', (error)=> {
    console.error('에러 발생', error)
})
server.on('listening', ()=> {
    console.log('------------------------------------')
    console.log(`Inforsion 서버 실행 중... 포트 ${port}번`)
    console.log('------------------------------------')
})