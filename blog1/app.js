const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json')

    const resData = {
        name = '100',
        site = 'imooc',
        env: process.env.NODE_ENV
    }   

    res.end(
        JSON.stringify(resData)
    )
}

module.exports = serverHandle