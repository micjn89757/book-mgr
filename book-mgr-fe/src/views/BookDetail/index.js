import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { book, inventoryLog } from '@/service';
import { result } from "@/helpers/utils";
import { ElMessage } from 'element-plus';
import Update from '@/views/Book/Update/index.vue'
import moment from 'moment';


export default defineComponent({
  components: {
    Update
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // 修改书籍弹框显示
    const showUpdateModal = ref(false);

    // 从路由取到id
    const id = route.params.id;
    // 书籍信息
    const detailInfo = ref({});
    // 处理时间
    const bookCreateTime = ref('');
    
    // 当前页日志数据
    const log = ref([]);
    // 日志总数
    const logTotal = ref(0);
    // 当前页码
    const logCurPage = ref(1);
    // 当前是入库还是出库
    const curLogType = ref(1);

    // 获取书籍信息
    const getDetail = async() => {
      const res = await book.detail(id);

      result(res).success(({data}) => {
        bookCreateTime.value = moment(data.meta.createdAt).format('YYYY-MM-DD HH:mm:ss');
        detailInfo.value = data;
      })
    }

    // 删除书籍
    const remove = async() => {

      const res = await book.del(id);

      result(res).success(({msg}) => {
        ElMessage({
          message: msg,
          type: 'success'
        });

        router.replace('/book');// 回到上一页
      })
    }

    // 页码改变时的操作
    const handleCurrentChange = (page) => {
      logCurPage.value = page;

      getInventoryLog();
    }

    // 获取出入库日志
    const getInventoryLog = async() => {
      // 参数先后顺序为type, page, size
      const res = await inventoryLog.list(curLogType.value, logCurPage.value, 6);

      result(res).success(({data: {list, total, page}}) => {
        log.value = list // 当前页的数据
        logTotal.value = total;
        logCurPage.value = page
      })
    }

    // 筛选日志是入库还是出库
    const logFilter = (type) => {
      curLogType.value = type;
      getInventoryLog();
    }


    // 给修改书籍子组件提供修改父组件数据的方法
    const updateCurBook = (newData) => {
      Object.assign(detailInfo.value, newData);
    }

    onMounted(() => {
      getDetail();
      getInventoryLog();
    })

    return {
      detailInfo,
      remove,
      bookCreateTime,
      updateCurBook,
      showUpdateModal,
      log,
      logTotal,
      logCurPage,
      handleCurrentChange,
      moment,
      logFilter
    }
  }
})