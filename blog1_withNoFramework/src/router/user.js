const { loginCheck } = require('../controller/user')
const { SuccessModel, FailModel} = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method


    if (method == 'POST' && req.path =='/api/user/login') {
        const {username, password} = req.body
        const result = loginCheck(username, password)
        if (result) {
            return new SuccessModel()
        }
        return new FailModel('Login failed!')
    }

}

module.exports = handleUserRouter