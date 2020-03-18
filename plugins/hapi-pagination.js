const hapiPagination = require('hapi-pagination');

const options = {
    // 查询参数
    query: {
        // 页
        page: {
            name: 'page',
            default: 1
        },
        // 条
        limit: {
            name: 'limit',
            default: 20
        },
        // 允许启用或禁用分页
        pagination: {
            name: 'pagination',
            default: true
        },
        invalid: 'defaults'
    },
    meta: {
        name: 'meta',
        count: {
            name: 'count',
            active: true
        },
        totalCount: {
            name: 'totalCount',
            active: true
        },
        pageCount: {
            name: 'pageCount',
            active: true
        },
        self: {
            name: 'self',
            active: true
        },
        previous: {
            name: 'previous',
            active: true
        },
        next: {
            name: 'next',
            active: true
        },
        first: {
            name: 'first',
            active: true
        },
        last: {
            name: 'last',
            active: true
        },
        page: {
            active: false
        },
        limit: {
            active: false
        }
    },
    results: {
        name: 'results'
    },
    reply: {
        paginate: 'paginate'
    },
    routes: {
        include: [
            '/shops',
            '/shops/{shopId}/goods'
        ],
        exclude: []
    }
}

module.exports = {
    register: hapiPagination,
    options: options
}
