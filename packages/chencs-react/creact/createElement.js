import { typeNumber } from '../utils/utils';

// 遍历config的时候，不需要进入props的属性，用于过滤
const RESERVED_PROPS = {
  ref: true,
  key: true,
  __self: true,
  __source: true
};


// 这里是构建虚拟dom, ...children 是剩余参数
/**
  * @param { String | Function } type
  * @param { Object } config 组件的很多信息都放在这里面，例如ref，key， props，className... 等
  * @param { array } children 类数组（react 也是这么干的，React.children api）
 */
function createElement(type, config, ...children) {
  let props = {}; // 收集到props都放在这里面
  let key = null; // 组件key
  let ref = null; // 用于操作组件实例的，后续会往上面挂载组件的实例
  let childLength = children.length;

  if(config !== null) {
    // 巧妙的key转化成字符串
    key = config.key === undefined ? null : '' + config.key; // 所以key最终解析之后呈现出来的一定是字符串
    ref = config.ref === undefined ? null : config.key;

    /**
      遍历config 取出组件属性，放入到props
    */
    for(let propName in config) {

      // 把不需要放入props的属性过滤掉
      if (RESERVED_PROPS.hasOwnProperty(propName)) continue

      // 保证进入props的属性不存在undefined,都是config中存在的
      if(config.hasOwnProperty(prop)) {
        props[propName] = config[propName];
      }
    };

    // 处理children 就是把children丢进props中
    if(childLength === 1) {
      //  typeNumber(children[0]) > 2 非null ，undefined
      props.children = typeNumber(children[0]) > 2 ? children[0] : [];
    } else if (childLength > 1) {
      props.children = children;
    };

    // 设置defaultProps
    let defaultProps = type.defaultProps;
    if(defaultProps) {
      for (let propName in defaultProps) {
        // 设置props中属性存在undefind为defaultProps
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      };
    };
  };

  return new Vnode(type, props, ref, key, typeNumber(type))
};


/**
  既然需要构建虚拟dom，就需要给每个节点创建虚拟节点
  下面是每个虚拟节点描述
*/
function Vnode(type, props, ref, key, VnodeType) {
  this.owner = '';
  this.type = type;
  this.props = props;
  this.key = key;
  this.ref = ref;
  this.VnodeType = VnodeType;
};


export const React = {
   createElement
}
