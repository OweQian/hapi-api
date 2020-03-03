// plugins/hapi-swagger.js
const Inert = require('inert');
const Vision = require('vision');
const package = require('package');
const HapiSwagger = require('hapi-swagger');

module.exports = [
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: {
            info: {
                title: '接口文档',
                version: package.version,
            },
            // 定义接口以 tags 属性定义为分组
            grouping: 'tags',
            tags: [
                { name: 'tests', description: '测试相关' },
            ]
        }
    }
]
