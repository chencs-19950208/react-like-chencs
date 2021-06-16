const _type = Object.prototype.toString;

var numberMap = {
  //null undefined IE6-8这里会返回[object Object]
  '[object Boolean]': 2,
  '[object Number]': 3,
  '[object String]': 4,
  '[object Function]': 5,
  '[object Symbol]': 6,
  '[object Array]': 7
}

/**
  typeNumber 将
  undefined: 0, null: 1, boolean:2, number: 3, string: 4, function: 5, symbol:6, array: 7, object:8
  转化成对应的key
*/
export function typeToNumber(data) {
  if (data === null) {
    return 1;
  };

  if (data === undefined ) {
    return 0;
  };

  return numberMap[_type.call(data)] || 8
};
