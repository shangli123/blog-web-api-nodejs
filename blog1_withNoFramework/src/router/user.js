const { login } = require('../controller/user')
const { SuccessModel, FailModel} = require('../model/resModel')



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

    // Test for login check
    if(method == 'GET' && req.path == '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel(`${JSON.stringify(req.session)} has already login.` ))
        }
        else {
            return Promise.resolve(new FailModel("No login info detected!"))
        }
    }

}

module.exports = handleUserRouter