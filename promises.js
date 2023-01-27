const google = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve('Cracked Google')
    },3000)
})

const apple = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve('Cracked Apple')
    },1000)
})
const netflix = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve('Cracked Netflix')
    },2000)
})

// Promise.all([
//     google,
//     apple,
//     netflix
// ]).then((results)=>{
//     console.log(results)
// }).catch((results)=>{
//     console.log(results)
// })

// Promise.race([
//     google,
//     apple,
//     netflix
// ]).then((results)=>{
//     console.log(results)
// }).catch((results)=>{
//     console.log(results)
// })

function makeRequest(location){
    return new Promise((resolve, reject)=>{
        if(location=='google'){
            resolve('location accepted. enjoy your ride;)')
        }
        else{
            reject('location rejected.')
        }
    })
}

function processRequest(message){
    // console.log(message)
    return new Promise((resolve, reject)=>{
        console.log('Processing request...')
        // setTimeout(function(){console.log('setTimeout executed')} , 2000)
        resolve(message)
    })
}

// standard method of calling promises
/*makeRequest('google').then((response)=>{
    processRequest(response).then((message)=>{
        console.log(message)
    })
}).catch((err)=>{console.log(err)})
*/

// async await method of calling promises
async function testFunction(){
    let response = await makeRequest('google')
    let process = await processRequest(response)
    console.log(process)
}

testFunction()
console.log('test1')
console.log('test2')
console.log('test3')
console.log('test4')