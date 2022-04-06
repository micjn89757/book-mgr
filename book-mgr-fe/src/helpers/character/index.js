import store from "@/store"

// 判断当前用户是否是管理员
export const isAdmin = () => {
  const uc = store.state.userCharacter;
  
  return uc.name === 'admin';
}

// 所有跟角色相关的方法
export const getCharacterInfoById = (id) => {
  const { characterInfo } = store.state;

  // 找到id对应得角色对象
  const one = characterInfo.find((item) => {
    return item._id === id
  });

  return one || { title: "未知角色" }
}