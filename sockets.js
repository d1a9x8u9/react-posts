module.exports = (server) => {
    const io = require('socket.io')(server)
    console.log('sockets.js')
    let users = 0

    io.on('connection', socket => {
        console.log(`[sockets.js] new conn`)
        users +=1

        socket.on('request-time', () => {
            console.log('[sockets.js]request-time')
            const subscribe = setInterval(() => {
                if (users) {
                    const today = new Date();
                    const date = `${today.getHours() }:${today.getMinutes()}:${today.getSeconds()}`
                    console.log(date)
                    socket.emit('client-recieved-time', date)
                }
                else 
                    clearInterval(subscribe)
            }, 1000)
        })

        socket.on('disconnect', () => {
            users -=1
        })
    })
}