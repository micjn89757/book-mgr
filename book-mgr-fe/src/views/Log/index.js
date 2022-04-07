import { defineComponent, ref, onMounted } from "vue";
import { log } from "@/service"
import { result } from "@/helpers/utils"
import { getLogInfoByPath } from "@/helpers/log";
import moment from "moment"

import { ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    simple: Boolean
  },
  setup(props) {
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

    const getList = async () => {
      const res = await log.list(curPage.value, props.simple ? 4 : 8);

      result(res).success(({data: {list: l, total: t}}) => {
        l.forEach((item) => {
          item.action = getLogInfoByPath(item.request.url);
        })
        list.value = l;
        total.value = t;
      })
    }

    const handleCurrentChange = () => {
      getList();
    }

    const remove = async({_id}) => {
      const res = await log.remove(_id);
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
      simple: props.simple
    }
  }
})