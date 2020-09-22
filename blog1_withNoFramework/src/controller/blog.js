const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = 'SELECT blogs.id, title, username FROM blogs JOIN users ON blogs.authorID = users.id WHERE 1=1 '
    if(author) {
        sql += `AND username='${author}' ` 
    }
    if(keyword) {
        sql += `AND title LIKE '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    return [
        {
            id: 1,
            title: 'Title 1',
            content: 'Content 1',
            createTime: 1600380222998,
            author: 'Shang'
        }
    ]
}

const newBlog = (blogData = {}) => {
    return {
        id: 4
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log('Updated blog, ', id, blogData)
    return true
}

const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}