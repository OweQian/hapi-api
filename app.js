const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-world');
const routesOrders = require('./routes/orders');
const routesShops = require('./routes/shops');
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');

const { env } = process;

const server = new Hapi.Server();

server.connection({
    port: env.PORT,
    host: env.HOST,
})

const init = async () => {
    await server.register([
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger,
    ]);
    server.route([
        // 创建一个简单的hello hapi接口
        ...routesHelloHapi,
        ...routesOrders,
        ...routesShops
    ]);
    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
