import { defineComponent, ref, onMounted, reactive } from "vue";
import { useRouter } from 'vue-router'
import AddOne from "./AddOne/index.vue";
import { book } from "@/service";
import { result } from "@/helpers/utils"
import { ElMessage } from 'element-plus'
import { getHeaders } from "@/helpers/request"
import Update from './Update/index.vue';


import {
  Search,
  Plus
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    AddOne,
    Update
  },
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

    const indexMethod = (index) => {
      return index + 1
    }

    const router = useRouter();

    // 添加书籍的对话框是否显示
    const show = ref(false);   
    // 修改书籍弹框显示
    const showUpdateModal = ref(false);
    const inCountShow = ref(false);
    const outCountShow = ref(false);
    const curEditBook = ref({}); //该条书籍的信息

    // 入库出库数量绑定
    const count = reactive({
      in: 0,
      out: 0
    })

    // 发送出入库请求需要的数据
    const countData = {
      id: String,
      type: Number,
      num: Number
    };

    // 入库
    const inCount = ({_id}) => {
      inCountShow.value = true;
      countData.id = _id;
      countData.type = 1;
    }

    // 出库
    const outCount = ({_id}) => {
      outCountShow.value = true;
      countData.id = _id;
      countData.type = 2;
    }

    // 出库入库关闭按钮
    const inClose = () => {
      inCountShow.value = false;
    }

    const outClose = () => {
      outCountShow.value = false;
    }

    // 提交入库出库数量
    const submitCount = async() => {
      if(countData.type === 1) {
        countData.num = count.in;
      }else {
        countData.num = count.out;
      }

      const res = await book.updateCount(countData);

      result(res).success(({msg}) => {
        ElMessage({
          type:'success',
          message: msg
        })

        // 清空原有数据
        count.in = 0;
        count.out = 0;

        // 刷新列表数据
        getList();
      }).fail(({msg}) => {
        ElMessage({
          type:'warning',
          message: msg
        })
      }) 
    }

    // 书籍列表
    const list = ref([]);
    // 搜索关键词
    const keyword = ref('');
    // 分页长度,总共多少页
    const total = ref(1);
    // 当前页数
    const currentPage = ref(1);

    // !请求书籍列表
    const getList = async() => {
       // 当组件被初始化/挂载时触发的事件, 进行请求数据
      const res = await book.list({
        page: currentPage.value, // 当前页码
        size: 8, // 每页显示的数量
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

    // 删除一本书籍
    const remove = async(record) => {
      // console.log(record);

      const { _id } = record;

      const res = await book.del(_id);

      result(res).success(({msg}) => {
        ElMessage({
          message: msg,
          type: 'success'
        });

        // 直接使用getList()刷新列表
        getList(); // 这样在显示时会与后端数据同步
      })
    }

    // 根据关键词搜索列表
    const onSearch = () => {
      getList();
    }

    // 使用clearabel清空输入框，重新发起请求,返回初始列表
    const back = () => {
      getList()
    }

    // 页码改变时重新进行请求
    const handleCurrentChange = (page) => {
      currentPage.value = page
      getList();
    }

    // 组件初始化时请求数据
    onMounted(async () => {
      getList();
      if(list) {
        loading.value = false
      }
    })

    // 更新操作，显示更新弹框,把要更新的书籍信息传给子组件
    const update = (record) => {
      showUpdateModal.value = true;
      curEditBook.value = record;
    }

    // 给子组件提供修改父组件数据的方法
    const updateCurBook = (newData) => {
      Object.assign(curEditBook.value, newData);
    }

    // 进入书籍详情页
    const toDetail = (record) => {
      router.push(`/book/${record._id}`);
    }

     // 上传excel
    const onUploadChange = (file, fileList) => {
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await book.addMany(key);

            result(res)
              .success(({ data: { addCount } }) => {
                ElMessage({
                  type:'success',
                  message: `成功添加${addCount}本书籍`
                });

                getList();
              });
          });
      }
    };

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
      back,
      remove,
      inCount,
      outCount,
      inCountShow,
      outCountShow,
      inClose,
      outClose,
      count,
      submitCount,
      showUpdateModal,
      update,
      curEditBook,
      updateCurBook,
      toDetail,
      loading,
      svg,
      simple: props.simple,
      onUploadChange,
      headers: getHeaders()
    }
  }
});