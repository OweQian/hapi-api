'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
      'goods',
      [
        { id: 1, shop_id: 1, name: '商品1', thumb_url: '1.png', ...timestamps },
        { id: 2, shop_id: 1, name: '商品2', thumb_url: '2.png', ...timestamps },
        { id: 3, shop_id: 1, name: '商品3', thumb_url: '3.png', ...timestamps },
        { id: 4, shop_id: 1, name: '商品4', thumb_url: '4.png', ...timestamps },
      ],
      {},
  ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    // 删除 shop 表 id 为 1，2，3，4 的记录
    return queryInterface.bulkDelete('goods', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  },
};
