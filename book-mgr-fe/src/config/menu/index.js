export const items =  [
  {
    title: '总览',
    index: '/dashboard',
    icon: 'list',
    onlyAdmin: true
  },
  {
    title: '书籍管理',
    index: '/book',
    icon: 'collection',
    onlyAdmin: false
  },
  {
    title: '用户管理',
    index: '/user',
    icon: 'user',
    onlyAdmin: true
  },
  {
    title: '日志列表',
    index: '/log',
    icon: 'message',
    onlyAdmin: true
  },
  {
    title: "修改密码",
    index: '/profile',
    icon: 'Pointer',
    onlyAdmin: false
  }
]

export const subitems= [
  {
    title: '其他业务',
    index: '1',
    onlyAdmin: false,
    icon: 'menu',
    children: [
      {
        title: '申请重置密码列表',
        index: '/reset/password',
        icon: 'position',
        onlyAdmin: true
      },
      {
        title: '邀请码',
        index: '/inviteCode',
        icon: 'lollipop',
        onlyAdmin: true
      },
    ]
  }
]