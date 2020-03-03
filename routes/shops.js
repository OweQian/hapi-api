const Joi = require('joi');

const GROUP_NAME = 'shops';

module.exports = [
    {
        method: 'GET',
        path: `/${GROUP_NAME}`,
        handler: (request, reply) => {
            reply();
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取店铺列表',
            validate: {
                query: {
                    limit: Joi.number().integer().min(1).default(10).description('每页的数目'),
                    page: Joi.number().integer().min(1).default(1).description('页码数')
                }
            }
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shopId}/goods`,
        handler: (request, reply) => {
            reply();
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取店铺的商品列表',
            validate: {
                params: {
                    shopId: Joi.string().required()
                },
                query: {
                    limit: Joi.number().integer().min(1).default(10).description('每页的数目'),
                    page: Joi.number().integer().min(1).default(1).description('页码数')
                }
            }
        }
    },
];
