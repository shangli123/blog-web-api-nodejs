const { login } = require('../controller/user')
const { SuccessModel, FailModel} = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method

    // Login Process
    if (method == 'POST' && req.path =='/api/user/login') {
        const {username, password} = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data) {
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
            return Promise.resolve(new SuccessModel())
        }
        else {
            return Promise.resolve(new FailModel("No login info detected!"))
        }
    }

}

module.exports = handleUserRouter