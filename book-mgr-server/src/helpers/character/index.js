`
  -1无任何权限
  0 管理员权限
  1 增加权限
  2 删除权限
  3 查找权限
  4 修改权限

`

// 角色提前定义好，属于系统默认配置
const defaultCharacters = [
  {
    title: '管理员',
    name: 'admin',
    power: {
      book:[0],
      user:[0]
    },
  },
  {
    title: '成员',
    name: 'member',
    power: {
      book: [3],
      user: [-1]
    }
  }
];

module.exports = {
  defaultCharacters
}