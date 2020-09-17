const handleUserRouter = (req, res) => {
    const method = req.method


    if (method == 'POST' && req.path =='/api/user/login') {
        return {
            msg: 'This is the interface to log in.' 
        }
    }

}

module.exports = handleUserRouter