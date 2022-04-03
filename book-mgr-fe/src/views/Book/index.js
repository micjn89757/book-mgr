import { defineComponent, ref, onMounted } from "vue";
import AddOne from "./AddOne/index.vue";
import { book } from "@/service";
import { result } from "@/helpers/utils"

import {
  Search,
  Plus
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    const indexMethod = (index) => {
      return index + 1
    }

    const show = ref(false);

    const list = ref([]);

    const keyword = ref('');

    // 分页长度,总共多少页
    const total = ref(1);

    // 当前页数
    const currentPage = ref(1);

    // 请求书籍列表
    const getList = async () => {
       // 当组件被初始化/挂载时触发的事件, 进行请求数据
      const res = await book.list({
        page: currentPage.value, // 当前页码
        size: 10, // 每页显示的数量
        keyword: keyword.value // 关键词
      });

      result(res).success(({data}) => {
        const { list:l , total:t } = data;
        list.value = l;
        total.value= t;
      }).fail((data) => {
        console.log("请求失败");
      })
    }

    // 根据关键词搜索列表
    const onSearch = () => {
      getList();
    }

    // 使用clearabel清空输入框，重新发起请求
    const back = () => {
      getList()
    }

    // 页码改变时重新进行请求
    const handleCurrentChange = (page) => {
      currentPage.value = page
      getList();
    }

    onMounted(async () => {
      getList();
    })

    return {
      Search,
      Plus,
      show,
      list,
      indexMethod,
      total,
      currentPage,
      handleCurrentChange,
      keyword,
      onSearch,
      back
    }
  }
});