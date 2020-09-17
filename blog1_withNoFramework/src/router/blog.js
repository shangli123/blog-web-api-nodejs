const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if (method == 'GET' && path =='/api/blog/list') {
        return {
            msg: 'This is the interface to receive the blog list.' 
        }
    }

    if (method == 'GET' && path == '/api/blog/detail') {
        return {
            msg: 'This the interface to recive the details of the blog.'
        }
    }

    if (method == 'POST' && path == '/api/blog/new') {
        return{
            msg: 'This is the interface to create a new blog'
        }
    }

    if (method == 'POST' && path == '/api/blog/update') {
        return{
            msg: 'This is the interface to update a blog'
        }
    }

    if (method == 'POST' && path == '/api/blog/delete') {
        return{
            msg: 'This is the interface to delete a blog'
        }
    }
}

module.exports = handleBlogRouter