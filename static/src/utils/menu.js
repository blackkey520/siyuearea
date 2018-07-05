module.exports = [
  {
    key: "memberlist",
    name: "会员信息", //模块
    icon: "database",
    child: [{
        key: "create",
        name: "添加会员",
        icon: "file",
        isMenuTab: false,
        clickable: false
      },
      {
        key: "edit",
        name: "编辑会员",
        icon: "file",
        isMenuTab: false,
        clickable: false
      },
      {
        key: "recharge",
        name: "会员充值",
        icon: "laptop",
        isMenuTab: false,
        clickable: false
      },
      {
        key: "orderrecord",
        name: "预定记录",
        icon: "setting",
        isMenuTab: false,
        clickable: false,
      },
      {
        key: "userecord",
        name: "使用记录",
        icon: "folder",
        isMenuTab: false,
        clickable: false,
      }
    ]
  },
  {
    key: "orderlist",
    name: "订单信息", //模块
    icon: "bars",
  },
  {
    key: "productcard",
    name: "优惠卡信息", //模块
    icon: "book",
    child: [{
        key: "create",
        name: "添加优惠卡",
        icon: "file",
        isMenuTab: false,
        clickable: false
      },
      {
        key: "edit",
        name: "编辑优惠卡",
        icon: "file",
        isMenuTab: false,
        clickable: false
      },
    ]
  },
  {
    key: "accountslist",
    name: "账目信息",
    icon: "api",
  },
  {
    key: "config",
    name: "系统设置", //模块
    icon: "setting",
  },
  {
    key: "tableManager",
    name: "模块管理", //模块
    icon: "database",
    child: [
      {
        key: "create",
        name: "新建模块",
        icon: "file",
        isMenuTab: false,
        clickable: false
      },
      {
        key: "edit",
        name: "修改模块",
        icon: "laptop",
        isMenuTab: false,
        clickable: false
      },
      {
        key: "info",
        name: "模块详情",
        icon: "setting",
        isMenuTab: false,
        clickable: false
      }
    ]
  }
];
// icon: 'laptop',
// icon: 'user',
// icon: 'shopping-cart',
// icon: 'api',
// icon: 'camera-o',
// icon: 'heart-o',
// icon: 'database',
// icon: 'bars',
// icon: 'search',
// icon: 'edit',
// icon: 'credit-card',
// icon: 'code-o',
// icon: 'line-chart',
// icon: 'bar-chart',
// icon: 'area-chart',
// icon: 'setting',
