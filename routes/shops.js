const Joi = require('joi');

const GROUP_NAME = 'shops';

const { paginationDefine } = require('../utils/router-help');

// 引入models
const models = require('../models');

module.exports = [
    {
        method: 'GET',
        path: `/${GROUP_NAME}`,
        handler: async (request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.shops.findAndCountAll(
                {
                    attributes: [
                        'id',
                        'name'
                    ],
                    limit: request.query.limit,
                    offset: (request.query.page - 1) * request.query.limit
                }
            );
            reply({results, totalCount});
        },
        config: {
            tags: ['api', GROUP_NAME],
            auth: false,
            description: '获取店铺列表',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shopId}/goods`,
        handler: async (request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.goods.findAndCountAll({
                where: {
                    shop_id: request.params.shopId
                },
                attributes: [
                    'id',
                    'name',
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            reply({ results, totalCount });
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取店铺的商品列表',
            validate: {
                params: {
                    shopId: Joi.string().required()
                },
                query: {
                    ...paginationDefine
                }
            }
        }
    },
];
