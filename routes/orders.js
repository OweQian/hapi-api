const Joi = require('joi');

const GROUP_NAME = 'orders';

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
                            goods_id: Joi.number().interger(),
                            count: Joi.number().interger()
                        })
                    )
                },
                headers: Joi.object({
                    authorization: Joi.string.required()
                }).unknown()
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
                headers: Joi.object({
                    authorization: Joi.string.required()
                }).unknown()
            }
        }
    },
];
