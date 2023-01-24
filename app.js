// *** STDIN in Node.js ***
function stdin(){
    const readline = require("readline")
    let rl = readline.createInterface(
        process.stdin,
        process.stdout
    )

    rl.question("your name?\n", (name) => {
        console.log("You're name is "+name)
        rl.close()
    }
    )
}

function events() {
    var Logger = require('./logger')
    const logger = new Logger()

    // listen to an event
    logger.on("biodata", (arg) => {
        console.log(`Event listener called. ${JSON.stringify(arg)}`)
    })

    message = {name:"Vishnu Balaji", company:"Google", location:"Bangalore"}
    logger.log(message)

    // emitter.on("skills", (skills) =>{
    //     console.log(skills)
    // })

    // emit an event
    // emitter.emit("biodata", {name:"Vishnu Balaji", company:"Google", location:"Bangalore"})
    // emitter.emit("skills", {languages:["Python", "C++", "Go", "Java"], technology:["Backend","Cloud computing"]})
}

// *** HTTP module ***
const http = require("http")
const server = http.createServer((req, res) => {
    if (req.url==='/'){
        res.write("Welcome to node.js")
        res.end()
    }
    if (req.url==='/api/companies'){
        res.write(JSON.stringify({"comp1":"Google"}))
        res.end()
    }
})
// server.on("connection", (connection) => {
//     console.log("connection established")
// })
server.listen(3000)

console.log("Listening on port 3000...")
