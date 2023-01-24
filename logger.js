const EventEmitter = require('events')

class Logger extends EventEmitter {
    log(message){
        console.log(`[INFO] : ${JSON.stringify(message)}`)
        console.log("Event emitted, waiting for listener...")
        this.emit("biodata", JSON.stringify(message))
    }
}

module.exports = Logger