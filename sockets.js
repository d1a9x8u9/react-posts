module.exports = (server) => {
    const io = require('socket.io')(server)

    let users = 0

    io.on('connection', socket => {
        console.log(`[sockets.js] user conn`)
        
        users +=1
        const today = new Date();
        socket.emit('client-recieved-time', today.toTimeString())

        socket.on('request-time', () => {
            const subscribe = setInterval(() => {
                if (users) {
                    const today = new Date();
                    socket.emit('client-recieved-time', today.toTimeString())
                }
                else 
                    clearInterval(subscribe)
            }, 1000)
        })

        socket.on('disconnect', () => {
            console.log(`[sockets.js] user dc`)
            users -=1
        })
    })
}