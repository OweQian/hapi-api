const Joi = require('joi');

const GROUP_NAME = 'orders';

const { jwtHeaderDefine } = require('../utils/router-help');

module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}`,
        handler: (request, reply) => {
            reply();
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '创建订单',
            validate: {
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer()
                        })
                    )
                },
                ...jwtHeaderDefine
            }
        }
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        handler: (request, reply) => {
            reply();
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '支付订单',
            validate: {
                params: {
                    orderId: Joi.string().required()
                },
                ...jwtHeaderDefine
            }
        }
    },
];
