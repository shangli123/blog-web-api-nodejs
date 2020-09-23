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
    const sql = `SELECT * FROM blogs WHERE id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const sql_getID = `SELECT id FROM users WHERE username = '${author}';`
    return exec(sql_getID).then(rows => {
        const authorID = rows[0].id
        const sql = `INSERT INTO blogs (title, content, authorID) VALUES ('${title}', '${content}', '${authorID}');`
        return exec(sql).then(insertData => {
            console.log('insertData is ', insertData)
            return {
                id: insertData.insertId
            }
        })
    })
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