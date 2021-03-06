const 
    fs = require('fs'),
    https = require('https'),
    express = require('express'),
    path = require('path')

const app = express()

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/danielxu.work/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/danielxu.work/fullchain.pem')
}

app.use(express.static(path.join(__dirname, 'build')))
app.get('/time', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const server = https.createServer(options, app)
require('./sockets')(server);

server.listen(443, () => console.log('listening on port 443'))
