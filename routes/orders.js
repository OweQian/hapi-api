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
            description: '创建订单'
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
            description: '支付订单'
        }
    },
];
