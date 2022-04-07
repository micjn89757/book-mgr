import { defineComponent, ref, onMounted } from "vue";
import { inviteCode } from "@/service"
import { result } from "@/helpers/utils"
import moment from "moment"
import { ElMessage } from "element-plus"

import { Position } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    // 加载显示
    const loading = ref(true)
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    const curPage = ref(1);
    const total = ref(1);
    const list = ref([]);
    const count = ref(0);

    const getList = async () => {
      const res = await inviteCode.list(curPage.value, 8);

      result(res).success(({data: {list: l, total: t}}) => {
        list.value = l;
        total.value = t;
      })
    }

    const onAdd = async() => {
      if(!count.value) {
        ElMessage({
          type:'warning',
          message: '至少添加一条'
        })

        return;
      }

      const res = await inviteCode.add(count.value);

      result(res).success(({msg}) => {
        ElMessage({
          type: 'success',
          message: msg
        })

        count.value = 0;

        getList()
      })
    }

    const handleCurrentChange = () => {
      getList();
    }

    const remove = async({_id}) => {
      // console.log(_id);
      const res = await inviteCode.remove(_id);
      result(res).success(({msg}) => {
        ElMessage({
          type: 'success',
          message: msg
        })

        getList()
      })
    }

    onMounted(async () => {
      getList();
      if(list) {
        loading.value = false
      }
    })

    return {
      list,
      curPage,
      total,
      moment,
      handleCurrentChange,
      remove,
      loading,
      svg,
      Position,
      count,
      onAdd
    }
  }
})