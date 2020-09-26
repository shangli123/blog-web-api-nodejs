const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, FailModel} = require('../model/resModel')

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
        req.body.author = 'zhang3'      
        const result = newBlog(req.body)
        return result.then(data =>{
            return new SuccessModel(data)
        })
    }

    if (method == 'POST' && req.path == '/api/blog/update') {
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
        const result = deleteBlog(id)
        if (result) {
            return new SuccessModel()
        }
        else {
            return new FailModel('Failed to delete this blog!')
        }
    }
}

module.exports = handleBlogRouter