const {exec, escape} = require('../db/mysql')

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
    const sql = `SELECT content, createtime, username, authorID, blogs.id, title FROM blogs JOIN users ON blogs.authorID = users.id WHERE blogs.id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const title = escape(blogData.title)
    const content = escape(blogData.content)
    const author = escape(blogData.author)
    const sql_getID = `SELECT id FROM users WHERE username = ${author};`
    return exec(sql_getID).then(rows => {
        const authorID = rows[0].id
        const sql = `INSERT INTO blogs (title, content, authorID) VALUES (${title}, ${content}, ${authorID});`
        return exec(sql).then(insertData => {
            //console.log('insertData is ', insertData)
            return {
                id: insertData.insertId
            }
        })
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = escape(blogData.title)
    const content = escape(blogData.content)

    const sql = `
        UPDATE blogs set title=${title}, content=${content} WHERE id=${id};
    `
    return exec(sql).then(updateData => {
        console.log('Updated data is: ', updateData)
        if (updateData.affectedRows) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    const sql_getID = `SELECT id FROM users WHERE username = '${author}';`
    return exec(sql_getID).then(rows => {
        const authorID = rows[0].id
        const sql = `DELETE FROM blogs where id = '${id}' AND authorID = '${authorID}';`
        return exec(sql).then(deleteData => {
            if (deleteData.affectedRows) {
                return true
            }
            return false
        })
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}