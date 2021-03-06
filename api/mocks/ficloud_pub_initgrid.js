const debug = require('debug')('ssc:mocks');
const low = require('lowdb');
const sleep = require('system-sleep');

const utils = require('./utils');
const config = require('./config');
const DB_TABLE = require('./db').db();


// 模仿网络和IO延迟
const ENABLE_FAKE_IO_DELAY = 0;

module.exports = {
  post: post
};

function post(req, res) {
  // 模仿网络延迟以及IO延迟
  sleep(config.IO_DELAY);

  const doctype = req.body.doctype || 'dept';

  const resObj = {
    __fake_server__: true,
    success: true,
    message: null,
  };

  // 根据基础档案类型，获取数据库中对应表的所有数据
  debug(`Open database file: t_${doctype}.json`);
  const db = low(`${__dirname}/db_data/t_${doctype}.json`);

  if (db.isEmpty().valueOf()) {
    resObj.success = false;
    resObj.message = `档案类型${doctype}对应的表文件t_${doctype}.json不存在，或者文件为空`;
  } else {
    resObj.data = db.value().head;
  }

  res.json(resObj);
}
