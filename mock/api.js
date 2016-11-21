const API = [{
  URL: '/api/data/analyzeMembers/:id(\\d+)',
  GET: {
    success: true,
    result: {
      name: '@CTITLE',
      'logins|30': [
        {
          name: '@DATE(yyyy-MM-dd)',
          'value|1-100': 1,
        },
      ],
      'adds|30': [
        {
          name: '@DATE(yyyy-MM-dd)',
          'value|1-200': 1,
        },
      ],
      'actives|30': [
        {
          name: '@DATE(yyyy-MM-dd)',
          'value|1-300': 1,
        },
      ],
      'loss|30': [
        {
          name: '@DATE(yyyy-MM-dd)',
          'value|1-100': 1,
        },
      ],
      'activeRate|30': [
        {
          name: '@DATE(yyyy-MM-dd)',
          'value|1-100': 1,
        },
      ],
      'lossRate|30': [
        {
          name: '@DATE(yyyy-MM-dd)',
          'value|1-100': 1,
        },
      ],
    },
    error: '',
  },
}, {
  URL: '/api/data/analyzeMembers', // 数据分析/会员分析
  GET: {
    success: true,
    result: {
      general: {
        'warning|1': [true, false],
        'amounts|1-9999': 1,
        logins: {
          'amounts|1-500': 1,
          'compare|1': ['较上30天', '较上一周', '较上15天'],
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        adds: {
          'amounts|1-500': 1,
          'compare|1': ['较上30天', '较上一周', '较上15天'],
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        actives: {
          'amounts|1-500': 1,
          'compare|1': ['较上30天', '较上一周', '较上15天'],
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        loss: {
          'amounts|1-500': 1,
          'compare|1': ['较上30天', '较上一周', '较上15天'],
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        activeRate: {
          'amounts|1-500': 1,
          'compare|1': ['较上30天', '较上一周', '较上15天'],
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        lossRate: {
          'amounts|1-500': 1,
          'compare|1': ['较上30天', '较上一周', '较上15天'],
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
      },
      app: {
        logins: {
          'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
          'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
        },
        adds: {
          'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
          'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
        },
        actives: {
          'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
          'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
        },
        loss: {
          'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
          'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
        },
        activeRate: {
          'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
          'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
        },
        lossRate: {
          'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
          'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
        },
        'total|10-100': 10,
        'data|10': [{
          'id|+1': 1,
          name: '@CNAME',
          'logins|1-99': 0,
          'new|1-99': 0,
          'actives|1-99': 0,
          'loss|1-99': 0,
          'activeRate|1': ['10%', '19%', '17%', '15%', '13%', '14%'],
          'lossRate|1': ['1%', '9%', '7%', '5%', '3%', '4%'],
        }],
      },
    },
    error: '',
  },
}, {
  URL: '/api/data/analyzeMembersApp', // 数据分析/会员分析_应用分析
  GET: {
    success: true,
    result: {
      logins: {
        'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
        'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
      },
      adds: {
        'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
        'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
      },
      actives: {
        'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
        'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
      },
      loss: {
        'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
        'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
      },
      activeRate: {
        'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
        'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
      },
      lossRate: {
        'max|1': ['海尔', '日日顺', '人人创客', '小微创客'],
        'min|1': ['天上人间', '兰帕德', '农夫山泉', '松井玲奈'],
      },
      'total|10-100': 10,
      'data|10': [{
        'id|+1': 1,
        name: '@CNAME',
        'logins|1-99': 0,
        'new|1-99': 0,
        'actives|1-99': 0,
        'loss|1-99': 0,
        'activeRate|1': ['10%', '19%', '17%', '15%', '13%', '14%'],
        'lossRate|1': ['1%', '9%', '7%', '5%', '3%', '4%'],
      }],
    },
    error: '',
  },
}, {
  URL: '/api/data/analyzeMembersGeneral', // 数据分析/会员分析_会员概况
  GET: {
    success: true,
    result: {
      'warning|1': [true, false],
      'amounts|1-9999': 1,
      logins: {
        'amounts|1-500': 1,
        'compare|1': ['较上30天', '较上一周', '较上15天'],
        'rate|1': ['100%', '234%', '189%', '200%'],
        'isRate|1': [true, false],
      },
      adds: {
        'amounts|1-500': 1,
        'compare|1': ['较上30天', '较上一周', '较上15天'],
        'rate|1': ['100%', '234%', '189%', '200%'],
        'isRate|1': [true, false],
      },
      actives: {
        'amounts|1-500': 1,
        'compare|1': ['较上30天', '较上一周', '较上15天'],
        'rate|1': ['100%', '234%', '189%', '200%'],
        'isRate|1': [true, false],
      },
      loss: {
        'amounts|1-500': 1,
        'compare|1': ['较上30天', '较上一周', '较上15天'],
        'rate|1': ['100%', '234%', '189%', '200%'],
        'isRate|1': [true, false],
      },
      activeRate: {
        'amounts|1-500': 1,
        'compare|1': ['较上30天', '较上一周', '较上15天'],
        'rate|1': ['100%', '234%', '189%', '200%'],
        'isRate|1': [true, false],
      },
      lossRate: {
        'amounts|1-500': 1,
        'compare|1': ['较上30天', '较上一周', '较上15天'],
        'rate|1': ['100%', '234%', '189%', '200%'],
        'isRate|1': [true, false],
      },
    },
    error: '',
  },
  POST: {
    success: true,
    'result|1': [true, false],
    error: '@TITLE',
  },
}, {
  URL: '/api/user/unFreeze/:id(\\d+)',
  POST: {
    'success|1': [true, false],
    'result|+1': 1,
    error: '',
  },
}, {
  URL: '/api/user/freeze/:id(\\d+)',
  POST: {
    'success|1': [true, false],
    'result|+1': 1,
    error: '',
  },
}, {
  URL: '/api/user/blacklist',
  POST: {
    'success|1': [true, false],
    result: {
      'total|10-100': 10,
      'data|10': [{
        userIp: '@IP',
        'userId|+1': 1,
        loginTime: '@TIME(a HH:mm:ss)',
        userName: '@CNAME',
      }],
    },
    error: '',
  },
}, {
  URL: '/api/user/del_blacklist',
  POST: {
    'success|1': [true, false],
    'result|+1': 1,
    error: '',
  },
}, {
  URL: '/api/user/add_blacklist',
  POST: {
    'success|1': [true, false],
    'result|+1': 1,
    error: '',
  },
}, {
  URL: '/api/user/log',
  POST: {
    'success|1': [true, false],
    result: {
      'total|10-100': 10,
      'data|10': [{
        userIp: '@IP',
        'userId|+1': 1,
        loginTime: '@TIME(a HH:mm:ss)',
        userName: '@CNAME',
        'userTag|1-5': 1,
        clientName: '@CNAME',
      }],
    },
    error: '',
  },
}, {
  URL: '/api/keys',
  GET: {
    'success|1': [true, false],
    result: {
      'total|10-100': 10,
      'data|10': [{
        ips: '@IP',
        'status|1': [true, false],
      }],
    },
    error: '',
  },
}, {
  URL: '/api/user/sensitive',
  GET: {
    'success|1': [true, false],
    result: {
      'total|10-100': 10,
      'data|10': [{
        'id|+1': 1,
        sensitiveWord: '@cname',
        createdAt: '@TIME(a HH:mm:ss)',
        createdBy: '@cname',
      }],
    },
    error: '',
  },
}, {
  URL: '/api/user/sensitive/add',
  POST: {
    'success|1': [true, false],
    'result|+1': 1,
    error: '',
  },
}, {
  URL: '/api/user/sensitive/delete/:id(\\d+)',
  POST: {
    'success|1': [true, false],
    'result|+1': 1,
    error: '',
  },
}, {
  URL: '/api/user/clients',
  GET: {
    'success|1': [true, false],
    'result|10': [{
      'id|+1': 1,
      value: '@CNAME',
    }],
    error: '',
  },
}, {
  URL: '/api/user/logintag',
  GET: {
    'success|1': [true, false],
    'result|10': [{
      'id|+1': 1,
      value: '@CNAME',
    }],
    error: '',
  },
}, {
  URL: '/api/user/detail/:id(\\d+)',
  GET: {
    success: true,
    result: {
      basicInfo: {
        headshot: '@img',
        username: '@email',
        realName: '@CNAME',
        nickname: '@CNAME',
        'gender|1': ['男', '女'],
        birthday: '@DATE',
        'grade|1': ['一级', '二级'],
        'pointScore|0-1000': 0,
        'freezePointScore|0-1000': 0,
        'privilege|1': ['随意', '听话'],
        phone: '12883434832',
        email: '@email',
      },
      userPortrayal: { // 用户画像
        network: '', // 网络活跃度
        shop: '', // 购物理性指数
        visit: '', // 访问终端
        price: '', // 价格敏感度
        product: '', // 产品偏好
        sale: '', // 促销敏感度
        color: '', // 颜色喜好
        platform: '', // 平台服务满意度
        radarMAp: [], // 顺序： 信用情况，影响力，满意度，活跃度，消费能力
      },
      'myFacility|10': [ // 我的设备
        {
          'channel|1': ['网器', '非网器'], // 渠道
          picture: '@img', // 产品图
          type: '海尔洗衣机KB3538', // 型号
          location: '客厅', // 位置
          'status|1': ['离线', '在线'], // 状态
          admin: '老王', // 管理员
          member: '小王 小李', // 成员
          'id|1-99': 1, // 设备id
        },
      ],
      'indentDetail|10': [ // 订单详情
        {
          picture: '@img', // 商品图
          name: 'Apple 苹果 MacBook Pro WLjsfkj399435/2.5HZj-435kd', // 商品名称
          size: '22', // 尺寸
          color: '黑色', //
          'unit|0-999': 0, // 单价
          'count|0-999': 0,
          payment: '无', // 实际付款
          indent: '已关闭', // 订单状态
          logistics: '签收', // 物流状态
          date: '@date', //收货日期
        },
      ],
      'integralInfo|4': [ // 用户积分信息
        {
          date: '@date', // 时间
          reason: '参与互动', // 原由
          'count|0-999': 0, //积分数量
        },
      ],
      'actionInfo|4': [ // 用户行为信息
        {
          date: '@date', // 时间
          location: '海尔商城', // 地点
          action: '参与互动', //举动
        },
      ],
      'commentInfo|4': [ // 用户评论信息
        {
          date: '@date', // 时间
          location: '商城团购', // 地点
          comment: '这个洗衣机真的很棒，真心的，省电又好用，', //评论
        },
      ],
      customInfo: { // 定制信息
        basicInfo: {
          'range|0-9': 0, // 排名
          'score|0-10': 0, // 评分
          'crowdfunding|0-9999': 0, // 众筹
          production: '9', // 作品
          'fans|0-999': 0, //粉丝
        },
        'list|2': [
          {
            picture: '@img',
            type: '海尔洗衣机KB003',     // 型号
            price: '3000',    // 参考价钱
            sales: '400',    // 销量
            airType: '挂式',  // 空调类型
            power: '2p',    // 功率
            change: '是',   // 变频
            coldtype: '冷暖型', // 冷暖类型
            powerGrade: '3级', // 能效级别
            hot: '否',        // 热门类型
            status: '34342', // 众筹状态
            start: '3435',  // 众筹开始
            stop: '43589',    // 众筹结束
            need: '20000',    // 众筹需要
            participation: '234', //众筹参与
          },
        ],
      },
      facilityInfo: { // 设备服务信息 使用日志
        'services|10': [ // 设备服务信息
          {
            type: '安装服务', // 服务类型
            appointDate: '@date', // 约定时间
            serverDate: '@date', // 服务时间
            consumption: '3000', // 服务消费
            degree: '非常满意', //满意程度
          },
        ],
        useLog: [ // 设备使用日志
          {
            count: '第34次使用', // 使用频率
            user: '老李', // 使用人
            startDate: '@date', // 启用时间
            timer: '3小时', //使用时长
          },
        ],
      },
    },
    error: '',
  },
}, {
  URL: '/api/users',
  POST: {
    'success|1': [true, false],
    result: {
      'total|10-100': 10,
      'data|10': [{
        'userId|+1': 1,
        username: '@cname',
        clientName: '@name',
        'pointScore|0-999': 0,
        'freezePointScore|0-999': 0,
        createdBy: '@cname',
        registerDate: '@date', // 注册时间
        lastLogin: '@date', // 最近登录
        'locked|1': [true, false],
      }],
    },
    error: '',
  },
}, {
  URL: '/api/user/detail_client',    // 设备详情
  GET: {
    success: true,
    result: {
      useLog: {
        'total|10-100': 10,
        'data|5': [
          {
            count: '第23次使用',
            user: '@cname',
            startTime: '@date',
            timer: '2小时',
          },
        ],
      },
      'server|3': [{
        serverType: '安装服务',
        serverTime: '@date',
        appointment: '@date',
        evaluate: '非常满意',
        serverConsume: '2小时',
      }],
    },
    error: '',
  },
}, {
  URL: '/api/security/getSMSRegisterConfig',
  GET: {
    'success|1': [true, false],
    result: {
      needCheck: 1,
      effectiveTime: 30,
      reSendInterval: 60,
      maxSendTimesPerDay: 24,
    },
  },
}, {
  URL: '/api/security/getEmailRegisterConfig',
  GET: {
    'success|1': [true, false],
    result: {
      effectiveTime: 20,
    },
  },
}, {
  URL: '/api/security/getAccountSecurity',
  GET: {
    'success|1': [true, false],
    result: {
      beforeShowVerificationCode: 3,
      beforeFreeze: 8,
      freezeTime: 36,
    },
  },
},
  {
    URL: '/api/user/detail_integral',    // 积分信息
    GET: {
      success: true,
      'result|4': [
        {
          date: '@date',
          reason: '参与活动',
          'count|1-999': 1,
        },
      ],
      error: '',
    },
  },
  {
    URL: '/api/user/detail_action',    // 行为信息
    GET: {
      success: true,
      'result|4': [
        {
          date: '@date',
          location: '海尔商城',
          action: '参与互动',
        },
      ],
      error: '',
    },
  },
  {
    URL: '/api/user/detail_comment',    // 评论信息
    GET: {
      success: true,
      'result|4': [
        {
          date: '@date',
          location: '海尔商城',
          comment: '这个洗衣机真的很棒，真心的，省电又好用，',
        },
      ],
      error: '',
    },
  },
  {
    URL: '/api/user/integral_freeze/:id(\\d+)',    // 积分冻结
    GET: {
      success: true,
      result: {
        'pointScore|1-999': 0,
        'freezePointScore|1000-10000': 0,
      },
      error: '',
    },
  },
  {
    URL: '/api/user/detail_custom',    // 评论信息
    GET: {
      success: true,
      'result|3': [
        {
          picture: '@img',
          type: '海尔洗衣机KB003',     // 型号
          'price|100-9999': 100,    // 参考价钱
          'sales|1-999': 1,    // 销量
          airType: '挂式',  // 空调类型
          power: '2p',    // 功率
          'change|1': ['是', '否'],   // 变频
          coldtype: '冷暖型', // 冷暖类型
          powerGrade: '3级', // 能效级别
          'hot|1': ['是', '否'],        // 热门类型
          'status|2000-9999': 1000, // 众筹状态
          'start|2000-9999': 1000,  // 众筹开始
          'stop|2000-9999': 1000,    // 众筹结束
          'need|3000-99999': 1000,    // 众筹需要
          'participation|8000-99999': 2000, //众筹参与
        },
      ],
      error: '',
    },
  },
  {
    URL: '/api/home',
    GET: {
      success: true,
      result: {
        actualTime: {
          'headcounts|2-999': 3, // 总人数
          'integrals|2-999': 3,  // 积分总数
          'services|2-999': 3,   // 服务总数
          'clients|2-999': 3,    // 设备总数
        },
        seven: {
          'logins|2-999': 3,   // 登录数
          'adds|2-999': 3,     // 新增数
          'actives|2-999': 3,  // 活跃数
          'runOff|2-999': 3,   // 流失数
          'activesRate|2-99': 3, // 日活率
          'runOffRate|2-99': 3,  // 流失率
        },
        'thirtyAdds|30': [
          {
            date: '@DATE(MM-dd)',     // 日期
            'counts|1-999': 5,   // 数量
          },
        ],
        'thirtyLogins|8': [
          {
            appName: '@cname',   // 应用名
            'counts|1-999': 3,    // 数量
          },
        ],
        'userMap|34': [
          {
            name: '@province',
            'value|1-9999': 2,
          },
        ],
      },
      error: '',
    },
  },
  {
    URL: '/api/data/analyzeServers',
    GET: {
      success: true,
      result: {
        'satisfactionTotal|1-9999': 1,
        'serverTotal|1-9999': 1,
        'total|10-100': 10,
        'data|10': [
          {
            'type|1': ['安装', '维修'],  // 服务类型
            'counts|1-99': 1,  // 服务次数
            'satisfactions|1-999': 1, // 满意次数
            'seconds|1-9': 1,  // 二次上门
            'complains|1-10': 1,  // 投诉次数
          },
        ],
      },
      error: null / '',
    },
  },
  {
    URL: '/api/data/analyzeServerDetail',
    GET: {
      success: true,
      result: {
        'echarts|30': [
          {
            key: '@date(MM-dd)',
            'value|1-999': 1,
          },
        ],
        'total|10-100': 10,
        'data|10': [
          {
            name: '@cname',  // 用户名字
            type: '极速退换货',  // 服务类型
            content: '退洗衣机', // 内容
            'isNo|1': ['是', '否'],  // 是否满意
            comment: '二次上门',
          },
        ],
      },
      error: null / '',
    },
  },
  {

    URL: '/api/data/abnormalUsers',
    GET: {
      success: true,
      result: {
        'total|10-100': 10,
        'data|10': [{
          name: '@CNAME',
          'getIntegral|1-100000': 0,
          'useIntegral|1-100000': 0,
          'freezeIntegral|1-100000': 0,
          'abnormalTime|': '@DATE',
        }],
      },
      error: '',
    },
  },
  {
    URL: '/api/data/integralAnalyze',
    GET: {
      success: true,
      result: {
        integrals: {    // 积分概况
          'obligate|99-99999': 99,  // 最近一天全网积预留总数
          out: {     // 积分发放总数
            'amounts|4-999': 4,  // 数量
            'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
            'rate|1': ['100%', '234%', '189%', '200%'],
            'isRate|1': [true, false],
          },
          useAmounts: {     // 积分使用总数
            'amounts|4-999': 4,  // 数量
            'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
            'rate|1': ['100%', '234%', '189%', '200%'],
            'isRate|1': [true, false],
          },
          exchange: {     // 兑换商品总数
            'amounts|4-999': 4,  // 数量
            'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
            'rate|1': ['100%', '234%', '189%', '200%'],
            'isRate|1': [true, false],
          },
          users: {     // 兑换人数
            'amounts|4-999': 4,  // 数量
            'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
            'rate|1': ['100%', '234%', '189%', '200%'],
            'isRate|1': [true, false],
          },
        },
        clientAnalyze: {       // 应用分析
          outMore: '海尔团', // 30天发放最多
          useMore: '日日顺', //30天使用最多
        },
        'total|11-999': 10,
        'data|10': [         // 应用分析table
          {
            'id|0-999': 0, // 序列号
            appName: '@name',  // 应用名称
            'out|0-999': 0,     // 积分发放数
            'use|0-999': 0,    // 积分使用数
            'shop|0-999': 0,   // 商品数
            'peoples|0-999': 0,  //兑换人数
          },
        ],
      },
      error: null / '',
    },
  },
  {
    URL: '/api/data/integralAnalyzeGeneral',
    GET: {
      success: true,
      result: {
        'obligate|99-99999': 99,  // 最近一天全网积预留总数
        out: {     // 积分发放总数
          'amounts|4-999': 4,  // 数量
          'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        useAmounts: {     // 积分使用总数
          'amounts|4-999': 4,  // 数量
          'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        exchange: {     // 兑换商品总数
          'amounts|4-999': 4,  // 数量
          'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
        users: {     // 兑换人数
          'amounts|4-999': 4,  // 数量
          'compare|1': ['较上30天', '较上一周', '较上15天'],    // 比较条件
          'rate|1': ['100%', '234%', '189%', '200%'],
          'isRate|1': [true, false],
        },
      },
      error: null,
    },
  },
  {
    URL: '/api/data/integralAnalyzeClient',
    GET: {
      success: true,
      result: {
        clientAnalyze: {       // 应用分析
          outMore: '海尔团', // 30天发放最多
          useMore: '日日顺', //30天使用最多
        },
        'total|11-999': 10,
        'data|10': [         // 应用分析table
          {
            'id|0-999': 0, // 序列号
            appName: '@name',  // 应用名称
            'out|0-999': 0,     // 积分发放数
            'use|0-999': 0,    // 积分使用数
            'shop|0-999': 0,   // 商品数
            'peoples|0-999': 0,  //兑换人数
          },
        ],
      },
      error: null,
    },
  },
  {
    URL: '/api/data/single',
    GET: {
      success: true,
      result: {
        data: {
          'out|30': [
            {
              key: '@date(MM-dd)',
              'value|1-999': 3,
            },
          ],
          'use|30': [
            {
              key: '@date(MM-dd)',
              'value|1-999': 3,
            },
          ],
        },
        'out|10': [
          {
            outType: '参与互动',    // 积分发放类型
            'integrals|1-999': 3,  // 积分数
            'peoples|1-999': 10,   //参与人数
          },
        ],
        'use|10': [
          {
            useType: '兑换商品',    // 积分发放类型
            'integrals|99-999': 20,  // 积分数
            'peoples|10-99': 19,   //参与人数
          },
        ],
      },
      error: null / '',
    },
  },
  {
     URL: '/api/user/password/config',
     GET: {
       success: true,
       result: {
         passwordLimit: {
           lengthMin: 1,
           lengthMax: 2,
           hasUpperCase: true,
           hasLowerCase: true,
           hasNumber: false,
           hasSpecialChar: false
         },
         passwordStrengthList: [
           {
             strength: -1,
             lengthFrom: 1,
             lengthTo: 2,
             hasUpperCase: true,
             hasLowerCase: true,
             hasNumber: false,
             hasSpecialChar: false
           },
           {
             strength: 0,
             lengthFrom: 1,
             lengthTo: 2,
             hasUpperCase: true,
             hasLowerCase: true,
             hasNumber: false,
             hasSpecialChar: false
           },
           {
             strength: 1,
             lengthFrom: 1,
             lengthTo: 2,
             hasUpperCase: true,
             hasLowerCase: true,
             hasNumber: false,
             hasSpecialChar: false
           },
           {
             strength: -1,
             lengthFrom: 1,
             lengthTo: 2,
             hasUpperCase: true,
             hasLowerCase: true,
             hasNumber: false,
             hasSpecialChar: false
           }
         ]
       }
     }
  },
];

export default API;
