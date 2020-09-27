var redis = require('redis')
var {REDIS_CONF} = require('../conf/db')

var redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

function set(key, value){
    if (typeof value === 'object') {
        value = JSON.stringify(val)
    }
    redisClient.set(key, value, redis.print)
}

function get(key){
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) =>{
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (exception) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {set, get}