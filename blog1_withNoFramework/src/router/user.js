const { login } = require('../controller/user')
const { SuccessModel, FailModel} = require('../model/resModel')

var getCookieExpires = () => {
    var d = new Date()
    d.setTime(d.getTime() + (24*3600*1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method

    // Login Process
    //if (method == 'POST' && req.path =='/api/user/login') {
    if (method == 'GET' && req.path =='/api/user/login') {
        //const {username, password} = req.body
        const {username, password} = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data) {
                // Write cookie to browser
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}` )
                return new SuccessModel()
            }
            else {
                return new FailModel('Login failed!')
            }
        })
    }

    // Test for login check
    if(method == 'GET' && req.path == '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel(`${req.cookie.username} has already login.` ))
        }
        else {
            return Promise.resolve(new FailModel("No login info detected!"))
        }
    }

}

module.exports = handleUserRouter