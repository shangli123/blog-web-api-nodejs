const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, FailModel} = require('../model/resModel')

//Login status check function:
var loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new FailModel("No login info detected!"))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    if (method == 'GET' && req.path =='/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listData =>{
            return new SuccessModel(listData)
        })
    }

    if (method == 'GET' && req.path == '/api/blog/detail') {

        const result = getDetail(id) 
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method == 'POST' && req.path == '/api/blog/new') {

        var loginCheckResult = loginCheck(req)
        if (loginCheckResult){
            return loginCheck
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data =>{
            return new SuccessModel(data)
        })
    }

    if (method == 'POST' && req.path == '/api/blog/update') {
        var loginCheckResult = loginCheck(req)
        if (loginCheckResult){
            return loginCheck
        }
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            else {
                return new FailModel('Blog update operation failed!')
            }
        })
    }

    if (method == 'POST' && req.path == '/api/blog/delete') {
        var loginCheckResult = loginCheck(req)
        if (loginCheckResult){
            return loginCheck
        }
        const author = req.session.username
        const result = deleteBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            else {
                return new FailModel('Blog deletion failed!')
            }
        })
    }
}

module.exports = handleBlogRouter