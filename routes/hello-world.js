module.exports = [
    // 创建一个简单的 hello hapi 接口
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('hello world');
        },
        config: {
            tags: ['api', 'tests'],
            description: '测试 hello hapi',
            auth: false
        }
    }
]
