/*eslint strict: ["error", "global"]*/

"use strict";

function runRegex(path, regex) {
  var m;
  if ((m = regex.exec(path)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      //console.log(`Found match, group ${groupIndex}: ${match}`);
    });
    return m[1];
  }
}

// input `/dept/query` output `dept`
exports.getDocTypeFromQueryPath = function (path) {
  return runRegex(path, /\/(.*)\/query/);
}

exports.getDocTypeFromSavePath = function (path) {
  return runRegex(path, /\/(.*)\/save/);
}

exports.getDocTypeFromDeletePath = function (path) {
  return runRegex(path, /\/(.*)\/delete/);
}

exports.getDocTypeFromTurnEnablePath = function (path) {
  return runRegex(path, /\/(.*)\/turnenable/);
}

exports.row = function (id, cols) {
  return {
    id: id,
    cols: cols.map(col => ({value: col}))
  };
}

/**
 * 输入整个数据库表中的所有数据，然后做分页
 * @param db_table 需要进行分页的数据。例子：
 * ```json
 * {
 *   body: [
 *     {id: 'u11', name: 'A11', email: 'a1@test.com'},
 *     {id: 'u22', name: 'A22', email: 'a1@test.com'}
 *   ]
 * }
 * ```
 * @param begin 分页其实的index
 * @param itemPerPage 每页显示的数量
 *
 *
 *
 */
exports.paginatioin = function (fullArr, begin, itemPerPage) {
  return fullArr.slice(begin, begin + itemPerPage);
}

exports.makeid = function (length) {
  length = length || 5;
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// 字符
exports.$string = function (id, name, size) {
  size = size || 40;
  return {
    "id": id,
    "lable": name,
    "datatype": 0,
    "length": size
  };
}

// 布尔
exports.$boolean = function (id, name) {
  return {
    "id": id,
    "lable": name,
    "datatype": 4
  };
}

// 参照
exports.$ref = function (id, name) {
  return {
    "id": id,
    "lable": name,
    "datatype": 5,
    refinfo: "G001ZM0000BASEDOC0000DEPT000000000000000"
  };
}

// 枚举
exports.$enum = function (id, name) {
  return {
    "id": id,
    "lable": name,
    "datatype": 6,
    "data": [
      {
        "key": "male",
        "value": "男"
      },
      {
        "key": "female",
        "value": "女"
      }
    ]
  };
}
