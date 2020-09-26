const { loginCheck } = require('../controller/user')
const { SuccessModel, FailModel} = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method


    if (method == 'POST' && req.path =='/api/user/login') {
        const {username, password} = req.body
        const result = loginCheck(username, password)
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            }
            else {
                return new FailModel('Login failed!')
            }
        })
    }

}

module.exports = handleUserRouter