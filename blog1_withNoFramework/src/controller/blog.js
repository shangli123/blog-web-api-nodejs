const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'Title 1',
            content: 'Content 1',
            createTime: 1600380222998,
            author: 'Shang'
        },
        {
            id: 2,
            title: 'Title 2',
            content: 'Content 2',
            createTime: 1600380222999,
            author: 'Peter'
        },
        {
            id: 3,
            title: 'Title 3',
            content: 'Content 3',
            createTime: 1600380223000,
            author: 'John'
        },
    ]
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
    console.log('newBlog blogData', blogData)
    return {
        id: 4
    }
}

module.exports = {
    getList,
    getDetail,
    newBlog
}