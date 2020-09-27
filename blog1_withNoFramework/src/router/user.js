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
                // Write cookie to browser
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session is', req.session)
                return new SuccessModel()
            }
            else {
                return new FailModel('Login failed!')
            }
        })
    }
}

module.exports = handleUserRouter