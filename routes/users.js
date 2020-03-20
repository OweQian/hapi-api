const JWT = require('jsonwebtoken');

const Joi = require('joi');

const models = require('../models');

const decryptData = require('../utils/WXBizDataCrypt');

const config = require('../config');

const axios = require('axios');

const GROUP_NAME = 'users';

module.exports = [{
   method: 'POST',
   path: `/${GROUP_NAME}/createJWT`,
   handler: async (request, reply) => {
       const generateJWT = (jwtInfo) => {
           const payload = {
               userId: jwtInfo.userId,
               exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
           };
           return JWT.sign(payload, process.env.JWT_SECRET);
       };
       reply(generateJWT({
           userId: 1
       }))
   },
   config: {
       tags: ['api', GROUP_NAME],
       description: '用于测试的用户 JWT 签发',
       auth: false
   }
}, {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (request, reply) => {
        const appid = config.wxAppid;
        const secret = config.wxSecret;
        const {code: js_code, encryptedData, iv} = request.payload;

        const response = await axios({
           url: 'https://api.weixin.qq.com/sns/jscode2session',
           method: 'GET',
           params: {
               appid,
               secret,
               js_code,
               grant_type: 'authorization_code'
           }
        });
        const { openid, session_key: sessionKey } = response.data;
        const user = await models.users.findOrCreate({
            where: {
                open_id: openid
            }
        });
        const pc = new decryptData(appid, sessionKey);
        const userInfo = pc.decryptData(encryptedData , iv);

        await models.users.update({
            nick_name: userInfo.nickName,
            gender: userInfo.gender,
            avatar_url: userInfo.avatarUrl,
            open_id: openid,
            session_key: sessionKey
        }, {
            where: {
                open_id: openid
            }
        });

        const generateJWT = (jwtInfo) => {
            const payload = {
                userId: jwtInfo.userIf,
                exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
            }
            return JWT.sign(payload, config.jwtSecret);
        }
        reply(generateJWT({
            userIf: user[0].id
        }));
    },
    config: {
        tags: ['api', GROUP_NAME],
        description: '微信登录接口',
        auth: false,
        validate: {
            payload: {
                code: Joi.string().required().description('微信用户登录的临时code'),
                encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
                iv: Joi.string().required().description('微信用户信息iv'),
            }
        }
    }
}];
