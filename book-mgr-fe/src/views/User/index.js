import { defineComponent, ref, onMounted } from 'vue';
import { user } from '@/service';
import { result } from '@/helpers/utils';
import { ElMessage } from 'element-plus';
import moment from 'moment';
import AddOne from './AddOne/index.vue';

import {
  Search,
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    AddOne
  },
  setup() {
    // 当前页列表数据
    const list = ref([]);
    // 所有用户数量
    const total = ref(0);
    // 当前页码
    const curPage = ref(1);

    // 添加用户弹窗显示控制
    const showAddModal = ref(false);

    // 搜索框关键字
    const keyword = ref("");

    // 是否显示分页
    const isSearch = ref(true);

    // 获取用户列表
    const getUser = async() => {
      const res = await user.list(curPage.value, 10, keyword.value);

      result(res).success(({data:{list: resList, total: resTotal}}) => {
        list.value = resList;
        total.value = resTotal;
      })
    }

    // 删除用户
    const remove = async ({ _id }) => {
      const res = await user.del(_id);

      result(res).success(({msg}) => {
        ElMessage({
          type: 'success',
          message: msg
        })
        getUser()
      })
    }

    // 根据关键字查找用户
    const onSearch = () => {
      getUser()

      if(keyword.value) {
        isSearch.value = false
      }
    }

    // 清除搜索框后的动作
    const back = () => {
      getUser();

      isSearch.value = true
    }

    // 重置密码
    const resetPassword = async({_id}) => {
      const res = await user.resetPassword(_id);

      result(res).success(({msg}) => {
        ElMessage({
          type: 'success',
          message: msg
        })
      }).fail(({msg}) => {
        ElMessage({
          type: 'error',
          message: msg
        })
      })
    }

    // 切换页面执行的动作
    const handleCurrentChange = (page) => {
      curPage.value = page;
      getUser();
    }

    onMounted(() => {
      getUser();
    })

    return {
      list,
      total,
      curPage,
      handleCurrentChange,
      moment,
      remove,
      showAddModal,
      getUser,
      resetPassword,
      Search,
      keyword,
      onSearch,
      back,
      isSearch
    }
  }
})